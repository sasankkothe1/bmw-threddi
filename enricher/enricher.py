import json
import logging
import os
import time

import pika


class Enricher:
    _service_name = ""
    _mq_url = ""
    _mq_port = 0
    _mq_user = ""
    _mq_password = ""

    _connection = None
    _channel = None
    _output_exchange = None

    _config = {}

    def __init__(self, service_name):
        self._service_name = service_name

        # Establish RabbitMQ Connection
        self._establish_connection()
        self._init_queues()

        self._polling()

    '''
    Method to initialize rabbitmq message queues.
    '''
    def _init_queues(self):
        # Define Queue
        self._queue_name = "qu_{}".format(self._service_name)
        self._output_exchange = os.environ.get('OUTPUT_EXCHANGE')

        self._channel.queue_declare(queue=self._queue_name,
                                    auto_delete=False,
                                    durable=True)

        self._channel.queue_bind(exchange=self._output_exchange,
                                 queue=self._queue_name,
                                 routing_key="{service_name}.#".format(service_name=self._service_name))

    def _polling(self):
        print(self._queue_name)
        self._channel.basic_consume(queue=self._queue_name,
                                    auto_ack=True,
                                    on_message_callback=self._process_event)
        print("Wait for events....")
        self._channel.start_consuming()

    def _process_event(self, ch, method, properties, body):

        print("{} got Event".format(self._service_name))
        # GET Configuration
        self._config = self._get_configuration()
        _event = json.loads(body)

        # Do event processing
        _event = self.enrich_event(event=_event)

        # Change routing key
        _new_routing_key = method.routing_key.split(".", 1)[1]

        # Send it
        self._send_event(json.dumps(_event), _new_routing_key)

    def _send_event(self, event, routing_key):
        logging.info("Send: Event to {} with routing key {}".format(self._output_exchange, routing_key))
        self._channel.basic_publish(exchange=self._output_exchange,
                                    routing_key=routing_key,
                                    body=event)

    def _get_configuration(self):
        # TODO implement Config Fetching
        _ = self._service_name
        config = {"source_field": ["url"]}

        return config

    def get_service_name(self):
        return self._service_name

    def _establish_connection(self):
        """
        Establish a valid rabbitMQ connection
        :return:
        """
        self._mq_url = os.environ.get('MQ_HOST')
        self._mq_port = os.environ.get('MQ_PORT')
        self._mq_user = os.environ.get('MQ_USER')
        self._mq_password = os.environ.get('MQ_PASSWORD')

        max_retries = os.environ.get('MAX_RETRIES') or 100
        try:
            assert self._mq_url
            assert self._mq_port
            assert self._mq_password
            assert self._mq_url
        except AssertionError as e:
            logging.error("Please define MQ parameter: {}".format(e))

        retries = 0
        connection_successful = False
        connection = None
        channel = None
        credentials = pika.PlainCredentials(username=self._mq_user, password=self._mq_password)

        while not connection_successful:
            connection_successful = False
            try:
                connection = pika.BlockingConnection(pika.ConnectionParameters(host=self._mq_url,
                                                                               port=self._mq_port,
                                                                               credentials=credentials))
                channel = connection.channel()
                connection_successful = True

            except:
                if retries == max_retries:
                    logging.error("No connection was established. Exit 1")
                    exit(1)

                retries = retries + 1
                logging.warning("No connection was established. Amounts of retries: {}".format(retries))
                time.sleep(1)
                pass

        self._connection = connection
        self._channel = channel

    def enrich_event(self, event):
        pass
