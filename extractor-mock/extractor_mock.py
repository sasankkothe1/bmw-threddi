import json
import logging
import time

import numpy as np
import os

import requests
import yaml

import RabbitMQHandler

EXTRACTOR_ID = "gdelt_05"


def _load_config(configuration_file='source.yaml'):
    """
    Loads the configuration file and adds it as private class attribute
    :param configuration_file:
    """

    # Fetch Config from Endpoint
    _status, _config = _load_configuration_from_endpoint(EXTRACTOR_ID)

    if _status == 404:
        # 404: - Setup Config by source.yaml
        _file_config = _load_configuration_from_file(configuration_file)
        _config = _file_config
        _status, result = _set_remote_configuration(_file_config)

        if _status != 200:
            print(result)


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
    print("Saved Configuration in DB")
    return post.status_code == 200, post


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


def convert(o):
    if isinstance(o, np.int64): return int(o)
    raise TypeError


if __name__ == '__main__':

    time.sleep(15)
    _load_config()
    with open("sample_events.txt", "r") as outputfile:
        _output_json = json.load(outputfile)

    _routing_key = "enricher_title_to_description.enricher_translator.datastore"
    _output_exchange = os.environ.get("OUTPUT_EXCHANGE")

    # Send to Queue
    _rabbitmq_handler = RabbitMQHandler.RabbitMQHandler()
    _rabbitmq_handler.init_destination_exchange(_output_exchange)

    for msg in _output_json:
        _send_msg = json.dumps(msg, default=convert)
        _rabbitmq_handler.send_message(_send_msg, routing_key=_routing_key)
        print("Mock data sent")
