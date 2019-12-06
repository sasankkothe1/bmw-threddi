import logging
import os

import pandas as pd
from datetime import datetime

from google.cloud import bigquery

METHOD_MAPPING = {
    "GreaterThan": "{field} > {threshold}",
    "GreaterThanAbs": "({field} > {threshold} OR {field} < -{threshold})",
    "GreaterThanEquals": "{field} >= {threshold}",
    "GreaterThanEqualsAbs": "({field} >= {threshold} OR {field} <= -{threshold})",

    "LessThan": "({field} < {threshold} OR {field} > -{threshold})",
    "LessThanAbs": "{field} < {threshold}",
    "LessThanEquals": "{field} <= {threshold}",
    "LessThanEqualsAbs": "({field} <= {threshold} OR {field} >= -{threshold})"
}


class GDELTFetcher:
    client = None
    _last_fetch = datetime.now().strftime("%Y%m%d000000")

    def __init__(self):
        self.client = bigquery.Client()

        self._logger = logging.getLogger(__name__)
        self._logger.setLevel(int(os.environ.get('LOG_LEVEL')) or logging.WARNING)

    def fetch_current_data(self, filter_options):
        event = pd.DataFrame()
        query_job = None

        # Get Conditions from the Source.yaml
        conditions = self.get_conditions(filter_options)

        query = (
            'SELECT * FROM `gdelt-bq.gdeltv2.events` WHERE DATEADDED>{lastdate}{conditions} ORDER BY DATEADDED DESC'.format(
                lastdate=self._last_fetch, conditions=conditions)
        )

        self._logger.info("Send query {query}".format(query=query))

        # DO THE QUERY

        query_job = self.client.query(query)  # API request - starts the query

        self._last_fetch = int(datetime.now().strftime("%Y%m%d%H%M%S")) - 100

        event = query_job.to_dataframe()
        self._logger.info("{} events fetched".format(len(event)))

        return event

    @staticmethod
    def get_conditions(filter_options):

        if not filter_options:
            return ""

        _condition = ""
        for options in filter_options:
            _method = options.get("method")
            _condition += " AND " + METHOD_MAPPING.get(_method).format(field=options.get('field'),
                                                                       threshold=options.get('threshold'))

        return _condition
