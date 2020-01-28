import json
import time

import numpy as np
import os

import RabbitMQHandler


def convert(o):
    if isinstance(o, np.int64): return int(o)
    raise TypeError


if __name__ == '__main__':

    time.sleep(15)
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
