import json
import numpy as np
import os

import RabbitMQHandler


def convert(o):
    if isinstance(o, np.int64): return int(o)
    raise TypeError


if __name__ == '__main__':
    with open("sample_events.txt", "r") as outputfile:
        _output_json = json.load(outputfile)

    _routing_key = "datastore"
    _output_exchange = os.environ.get("OUTPUT_EXCHANGE")

    # Send to Queue
    _rabbitmq_handler = RabbitMQHandler.RabbitMQHandler()
    _rabbitmq_handler.init_destination_exchange(_output_exchange)

    message = json.dumps(_output_json, default=convert)
    _rabbitmq_handler.send_message(message, routing_key=_routing_key)

    print("Mock data sent")
