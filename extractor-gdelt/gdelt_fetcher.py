import logging
import os

import pandas as pd
from datetime import datetime

from google.cloud import bigquery
from extractor import Extractor
from extractor import RADIUS_MAPPING

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

    def fetch_current_data(self, filter_options, general_filter_option):
        event = pd.DataFrame()
        query_job = None

        # Get Conditions from the Source.yaml
        conditions = self.get_conditions(general_filter_option)
        specialized_conditions = self.get_conditions(filter_options)

        location_query, location_def = self.get_location_conditions(specialized_conditions)

        query = (
            'SELECT *  FROM `gdelt-bq.gdeltv2.events` WHERE DATEADDED>{lastdate} AND ({location_query} {conditions})  ORDER BY DATEADDED DESC'
                .format(location_def=location_def,
                        lastdate=self._last_fetch,
                        conditions=conditions[4:],
                        location_query=location_query)
        )

        self._logger.info("Send query {query}".format(query=query))

        # DO THE QUERY

        # query_job = self.client.query(query)  # API request - starts the query

        self._last_fetch = int(datetime.now().strftime("%Y%m%d%H%M%S")) - 100

        event = query_job.to_dataframe()
        self._logger.info("{} events fetched".format(len(event)))

        return event

    @staticmethod
    def get_location_conditions(specialized_conditions):
        locations = Extractor.get_main_locations()
        location_def = ""
        location_query = ""
        for idx, location in enumerate(locations):
            location_val = location['_source']['mainLocation']
            location_id = "LOCATION{idx}".format(idx=idx)

            location_def += ", ST_GEOGPOINT({long},{lat}) AS {location_id}, ST_DISTANCE(POINT, {location_id}) AS " \
                            "DIST{location_id}".format(lat=location_val['lat'],
                                                       long=location_val['long'],
                                                       location_id=location_id)

            location_query += "(ST_DWITHIN(ST_GeogPoint(ActionGeo_Long, ActionGeo_Lat)," \
                              " ST_GeogPoint({long}, {lat}), " \
                              "{radius})  {specialized_conditions}) OR".format(
                location_id=location_id,
                lat=location_val['lat'],
                long=location_val['long'],
                radius=RADIUS_MAPPING[int(location_val['priority'])],
                specialized_conditions=specialized_conditions)

        return location_query, location_def

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
