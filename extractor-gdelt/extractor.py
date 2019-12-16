import json
import logging
import os
import time
import uuid
from threading import Thread

import yaml
import pandas as pd
import numpy as np

import RabbitMQHandler


class Extractor:
    _is_polling = False
    _config = None
    _source_df = None
    _output_frame = pd.DataFrame()
    _output_json = None
    _additional_information = pd.DataFrame()
    _output_exchange = None
    _routing_key = None
    _rabbitmq_handler = None

    def __init__(self, configuration_file="source.yaml"):
        self._load_config(configuration_file)
        self.origin_name = self._config.get("id") or "unknown"

        self._output_exchange = os.environ.get("OUTPUT_EXCHANGE")
        assert self._output_exchange

        self._logger = logging.getLogger(__name__)
        self._logger.setLevel(int(os.environ.get('LOG_LEVEL')) or logging.WARNING)

        self._create_routing_key()

        self.default_properties = self._config.get("default_properties")

        # Send to Queue
        self._rabbitmq_handler = RabbitMQHandler.RabbitMQHandler()
        self._rabbitmq_handler.init_destination_exchange(self._output_exchange)

        self._init_threading()
        self._start_threading()

    def _init_threading(self):
        minutes = int(self._config.get("default_properties").get("polling"))
        self._polling_thread = Thread(target=self._do_polling, args=(minutes,))
        self._logger.info("Start Logging with polling of {}".format(minutes))

    def _start_threading(self):
        self._is_polling = True
        self._polling_thread.start()

    def _do_polling(self, minutes):

        logging.info("Start polling...")
        iteration = 0
        while self._is_polling:
            iteration += 1
            self._source_df = self.fetch_current_data()
            self._logger.info("Iteration {iteration}".format(iteration=iteration))

            try:
                self._do_mapping()
                self._add_fields()
            except KeyError as e:
                self._logger.error("One accessed Key is not available, when adding fields...{}".format(e))

            self._convert_to_json()

            try:
                self._add_additional_information()
            except KeyError as e:
                self._logger.error(
                    "One accessed Key is not available. when adding additional information.....{}".format(e))

            # with open("sample_events.txt", "w") as outputfile:
            #     json.dump(self._output_json, outputfile, default=self.convert)

            message = json.dumps(self._output_json, default=self.convert)
            self._rabbitmq_handler.send_message(message, routing_key=self._routing_key)

            self._logger.debug("Waiting for {min} minutes".format(min=minutes))

            # Sleep for 60* Minutes seconds
            time.sleep(minutes*60)
            self._clear_data()

    def _clear_data(self):
        self._source_df = None
        self._output_frame = pd.DataFrame()
        self._output_json = None
        self._additional_information = pd.DataFrame()

    @staticmethod
    def convert(o):
        if isinstance(o, np.int64): return int(o)
        raise TypeError

    def _add_fields(self):
        if "id" not in self._output_frame:
            id = self.add_id(self._source_df)
            if id is None:
                ids = []
                for i in range(0, len(self._source_df)):
                    ids.append(uuid.uuid4())

                self._output_frame['id'] = ids
            else:
                self._output_frame['id'] = id

        self._get_field("description", self.add_description, "No description")
        self._get_field("importance", self.add_importance, -1)
        self._get_field("sentiment_group", self.add_sentiment_group, 0)
        self._get_field("actors", self.add_actors, [])

        self._set_origin()

    def _get_field(self, key, function, default_value):
        if key not in self._output_frame:
            value = pd.DataFrame(function(self._source_df))
            self._output_frame[key] = value if len(value) > 0 else default_value

    def fetch_current_data(self):
        pass

    def start_polling(self):
        pass

    def stop_polling(self):
        pass

    def _add_additional_information(self):
        """
        Adding the additional information based on the source.yaml. Furthermore the private JSON file
        :return:
        """

        add_config = self._config.get('default_properties').get('source_dependent_information')

        total_events = []

        for key in self._output_json:
            obj = []
            for add_info_key in add_config:
                add_info_key['value'] = self._source_df[add_info_key['id']][int(key)]
                obj.append(add_info_key)
            self._output_json.get(key)['source_dependent_information'] = obj

            # add it to list
            total_events.append(self._output_json.get(key))
        self._output_json = total_events

    def _create_routing_key(self):
        routing_key = ""
        processing = self._config.get("processing")
        try:
            for step in processing:
                assert "." not in step
                routing_key += "{step}.".format(step=step.lower())

        except AssertionError as e:
            logging.error("Processing step names are not allowed to contain '.'.", e)

        self._routing_key = routing_key[:-1]

    # Field Mappings
    def add_actors(self, source_df):
        pass

    def add_id(self, source_df):
        pass

    def add_importance(self, source_df):
        pass

    def add_sentiment_group(self, source_df):
        pass

    def add_position(self, source_df):
        pass

    def add_description(self, source_df):
        pass

    def _set_origin(self):
        self._output_frame['origin'] = self.origin_name

    def _do_mapping(self):
        """
        Already maps the first _values
        :return:
        """
        mapping_config = self._config.get('default_properties').get('field_mappings')
        if not mapping_config:
            return

        for key in mapping_config.keys():
            source_key = mapping_config[key]
            self._output_frame[key] = self._source_df[source_key]

    def _load_config(self, configuration_file):
        """
        Loads the configuration file and adds it as private class attribute
        :param configuration_file:
        """
        try:
            with open(configuration_file, 'r') as stream:
                self._config = yaml.safe_load(stream)
        except FileNotFoundError as e:
            logging.error("No such configuration file", e)
        except yaml.YAMLError as exc:
            logging.error("Configuration file is wrong", exc)

        assert self._config

    def _convert_to_json(self):
        self._output_json = json.loads(self._output_frame.to_json(orient='index'))
        self._output_frame = None
