import logging

import os
import time

import pika


class RabbitMQHandler:
    _connection = None
    _channel = None
    _host = None
    _port = None
    _logger = None

    _destination_exchange = None

    def __init__(self):

        self._host = os.environ.get('MQ_HOST')
        self._port = os.environ.get('MQ_PORT') or 5672
        self._user = os.environ.get('MQ_USER')
        self._password = os.environ.get('MQ_PASSWORD')

        self._logger = logging.getLogger(__name__)
        self._logger.setLevel(int(os.environ.get('LOG_LEVEL')) or logging.WARNING)

        try:
            self._logger.debug("MQ_HOST {}".format(self._host))
            assert self._host

            self._logger.debug("MQ_PORT {}".format(self._port))
            assert self._port

            self._logger.debug("MQ_USER {}".format(self._user))
            assert self._user

            self._logger.debug("MQ_PASSWORD {}".format(self._password))
            assert self._password

        except AssertionError as error:
            self._logger.error(
                "Please define the messageQueue attribute like the host, user, port etc {}".format(error))
            exit(1)

        self.establish_rabbit_connection()
        pass

    def init_destination_exchange(self, exchange_name):
        # Init exchange

        self._destination_exchange = exchange_name
        self._channel.exchange_declare(exchange=exchange_name,
                                       exchange_type='topic')

    def establish_rabbit_connection(self, mq_retries=100):
        """
        Establishes a connection to the Rabbit MQ via Host
        Parameters
        ----------
        host : str
            host of the main rabbit mq instance
        port : str
            port of the main rabbit mq instance
        mq_retries : str
            amount of retries before rejecting (default is 100)
        """

        retries = 0
        connection_successful = False
        connection = None
        channel = None
        credentials = pika.PlainCredentials(username=self._user, password=self._password)

        while not connection_successful:
            connection_successful = False
            try:

                connection = pika.BlockingConnection(
                    pika.ConnectionParameters(host=self._host, port=int(self._port), credentials=credentials))
                channel = connection.channel()

                connection_successful = True

            except:
                if retries == mq_retries:
                    exit(1)

                retries = retries + 1
                self._logger.warning(
                    "No connection was established. Amounts of retries: ${retries}".format(retries=retries))

                time.sleep(1)
                pass

        self._connection = connection
        self._channel = channel

    def send_message(self, message, routing_key):
        """
        Sends a message to specific exchange with a routing_key
        :param message:
        :param exchange:
        :param routing_key:
        :return:
        """
        self._logger.info("Datapoints sent to queue")

        self._channel.basic_publish(exchange=self._destination_exchange,
                                    routing_key=routing_key,
                                    body=message)
        print(message)
