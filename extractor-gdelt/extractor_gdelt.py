"""
Class to fetch Data from the GDELT Database

Therefore the class follows a polling mechanism.
"""
import logging
from datetime import datetime

import gdelt
import numpy as np
from extractor import Extractor


def sigmoid(value):
    sigmoid = lambda x: 1 / (1 + np.math.exp(-x))
    vfunc = np.vectorize(sigmoid)

    return vfunc(value)


class GDELTExtractor(Extractor):

    def __init__(self):
        super(GDELTExtractor, self).__init__("")

    def fetch_current_data(self):
        logging.debug("Starting querying GDELT")
        gd2 = gdelt.gdelt(version=2)
        # results = gd2.Search(datetime.now().strftime("%Y %b %d"), table="events", output='pandas')
        results = gd2.Search("2019 Jan 8", table="events", output='pandas')
        logging.info("Fetched {} DataPoints ".format(len(results)))

        return results

    # Field Mappings
    def add_id(self, source_df):
        naming = lambda x: "{}_{}".format(self.origin_name, x)
        vfunc = np.vectorize(naming)
        ids = vfunc(source_df['GLOBALEVENTID'])
        return ids.reshape((len(ids), 1))

    def add_importance(self, source_df):
        goldstein = np.array(sigmoid(np.abs(source_df['GoldsteinScale'])-10))
        return 1*goldstein

    def add_sentiment_group(self, source_df):
        avgTone = np.array(source_df['AvgTone'])
        bins = [-100, -10, -1, 1, 10, 100]
        classes = np.digitize(avgTone, bins)
        return classes

    def add_position(self, source_df):
        pass



if __name__ == '__main__':
    GDELTExtractor()
    pass
