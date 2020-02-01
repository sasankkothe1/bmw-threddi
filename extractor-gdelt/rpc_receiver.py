from _thread import start_new_thread

from flask import Response, Flask


class RPCEndpoint:

    def __init__(self, action):
        self.action = action
        self.response = Response(status=200, headers={})

    def __call__(self, *args):
        start_new_thread(self.action, ())
        return self.response


class FlaskAppWrapper(object):
    app = None

    def __init__(self, name):
        self.app = Flask(name)

    def run(self, port, host="0.0.0.0"):
        self.app.run(host=host, port=port)
        print("RPC SERVER STARTED")

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None):
        self.app.add_url_rule(endpoint, endpoint_name, RPCEndpoint(handler), methods=['POST'])
