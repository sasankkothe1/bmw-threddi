import json
import logging
import os
import time
import uuid
from _thread import start_new_thread
from threading import Thread

import requests
import yaml
import pandas as pd
import numpy as np


import RabbitMQHandler
from rpc_receiver import FlaskAppWrapper

RADIUS_MAPPING = {
    1: 50000,
    2: 100000,
    3: 500000,
    4: 1000000,
    5: 3000000
}


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
    _extractor_id = ""

    def __init__(self, extractor_id, configuration_file="source.yaml"):
        self._extractor_id = extractor_id
        self._load_config(configuration_file)

        self._output_exchange = os.environ.get("OUTPUT_EXCHANGE")
        assert self._output_exchange

        self._logger = logging.getLogger(__name__)
        self._logger.setLevel(int(os.environ.get('LOG_LEVEL')) or logging.WARNING)

        self._create_routing_key()

        self.default_properties = self._config.get("default_properties")

        # Send to Queue
        self._rabbitmq_handler = RabbitMQHandler.RabbitMQHandler()
        self._rabbitmq_handler.init_destination_exchange(self._output_exchange)

        start_new_thread(self._rpc_endpoint_management, ())

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

            _success = self._do_enriching(minutes=minutes, iteration=iteration)
            # Sleep for 60* Minutes seconds
            self._logger.debug("Waiting for {min} minutes".format(min=minutes))
            time.sleep(minutes * 60)

            self._clear_data()

    def _do_enriching(self, minutes=0, iteration=0):
        special_fetch = False
        if iteration:
            self._logger.info("Iteration {iteration}".format(iteration=iteration))
        else:
            special_fetch = True
            self._logger.info("_")
            self._logger.info("#####################################################################################")
            self._logger.info("Extraordinary Fetching of events")
            self._logger.info("#####################################################################################")
            self._logger.info("_")

        status, _endpoint_config = self._load_configuration_from_endpoint(self._extractor_id)
        if status == 200:
            self._config = _endpoint_config

        self._source_df = self.fetch_current_data(special_fetch)

        if len(self._source_df) == 0:
            # Sleep for 60* Minutes seconds
            self._logger.warning("No EVENTS COULD BE FETCHED: Waiting for {min} minutes".format(min=minutes))
            time.sleep(minutes * 60)
            return False

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

        with open("sample_events.txt", "w") as outputfile:
            json.dump(self._output_json[:1000], outputfile, default=self.convert)

        for event in self._output_json:
            _event = json.dumps(event, default=self.convert)
            self._rabbitmq_handler.send_message(_event, routing_key=self._routing_key)

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
            _id = self.add_id(self._source_df)
            if _id is None:
                ids = []
                for i in range(0, len(self._source_df)):
                    ids.append(uuid.uuid4())

                self._output_frame['id'] = ids
            else:
                self._output_frame['id'] = _id

        self._get_field("description", self.add_description, "No description")
        self._get_field("importance", self.add_importance, -1)
        self._get_field("sentiment_group", self.add_sentiment_group, 0)
        self._get_field("actors", self.add_actors, [])

        self._set_origin()

    def _get_field(self, key, function, default_value):
        if key not in self._output_frame:
            value = pd.DataFrame(function(self._source_df))
            self._output_frame[key] = value if len(value) > 0 else default_value

    def fetch_current_data(self, specialfetch=None):
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
        self._output_frame['origin'] = self._extractor_id

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

    def fetch_configuration(self):
        pass

    def _load_config(self, configuration_file='source.yaml'):
        """
        Loads the configuration file and adds it as private class attribute
        :param configuration_file:
        """

        # Fetch Config from Endpoint
        _status, _config = self._load_configuration_from_endpoint(self._extractor_id)

        if _status == 404:
            # 404: - Setup Config by source.yaml
            _file_config = self._load_configuration_from_file(configuration_file)
            self._config = _file_config
            _status, result = self._set_remote_configuration(_file_config)

            if _status != 200:
                print(result)

        elif _status == 200:
            print("Used DB Config")
            self._config = _config
        else:
            logging.error("ERROR Could not get DB config")
            _file_config = self._load_configuration_from_file(configuration_file)
            self._config = _file_config

    @staticmethod
    def _load_configuration_from_file(configuration_file):
        _config = None
        try:
            with open(configuration_file, 'r') as stream:
                _config = yaml.safe_load(stream)
        except FileNotFoundError as e:
            logging.error("No such configuration file", e)
        except yaml.YAMLError as exc:
            logging.error("Configuration file is wrong", exc)

        assert _config
        return _config

    def _convert_to_json(self):
        self._output_json = json.loads(self._output_frame.to_json(orient='index'))
        self._output_frame = None

    @staticmethod
    def _load_configuration_from_endpoint(extractor_id):
        backend_url = os.environ.get('ADMINISTRATOR_BACKEND_URL')
        backend_port = os.environ.get('ADMINISTRATOR_BACKEND_PORT')

        token = "{}".format(os.environ.get('SERVICE_AUTHENTICATION_CODE'))
        headers = {'authentication_type': 'service', 'Authentication': token}

        configurations = requests.get(
            "http://{url}:{port}/configurations/{id}".format(url=backend_url, port=backend_port, id=extractor_id),
            headers=headers)
        if configurations.status_code != 200:
            logging.error(configurations)

        return configurations.status_code, configurations.json().get('_source')['configuration'] \
            if configurations.status_code == 200 else None

    @staticmethod
    def get_main_locations():
        backend_url = os.environ.get('ADMINISTRATOR_BACKEND_URL')
        backend_port = os.environ.get('ADMINISTRATOR_BACKEND_PORT')

        token = "{}".format(os.environ.get('SERVICE_AUTHENTICATION_CODE'))
        headers = {'authentication_type': 'service',
                   'Authentication': token}

        main_locations = requests.get("http://{url}:{port}/mainlocations".format(url=backend_url,
                                                                                 port=backend_port
                                                                                 ), headers=headers)
        return main_locations.json()

    @staticmethod
    def _set_remote_configuration(_file_config):
        backend_url = os.environ.get('ADMINISTRATOR_BACKEND_URL')
        backend_port = os.environ.get('ADMINISTRATOR_BACKEND_PORT')

        token = "{}".format(os.environ.get('SERVICE_AUTHENTICATION_CODE'))
        headers = {'authentication_type': 'service',
                   'Content-Type': 'application/json',
                   'Authentication': token}

        post = requests.post("http://{url}:{port}/configurations".format(url=backend_url, port=backend_port),
                             json.dumps(_file_config),
                             headers=headers)
        return post.status_code == 200, post

    def rpc_triggered(self):
        self._do_enriching()

    def _rpc_endpoint_management(self):
        a = FlaskAppWrapper('wrap')
        a.add_endpoint(endpoint='/triggerextracting', endpoint_name='/triggerextracting', handler=self.rpc_triggered)

        port = os.environ.get("RPC_PORT", 4321)

        a.run(port=port)
