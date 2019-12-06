"""
Class to fetch Data from the GDELT Database

Therefore the class follows a polling mechanism.
"""
import logging

import numpy as np

import gdelt_fetcher
from extractor import Extractor


def sigmoid(value):
    sigmoid = lambda x: 1 / (1 + np.math.exp(-x))
    vfunc = np.vectorize(sigmoid)

    return vfunc(value)


class GDELTExtractor(Extractor):
    _fetcher = gdelt_fetcher.GDELTFetcher()

    def __init__(self):
        super(GDELTExtractor, self).__init__()

    def fetch_current_data(self):
        logging.debug("Starting querying GDELT")

        results = self._fetcher.fetch_current_data(self.default_properties.get('filter_options'))
        print(len(results))
        return results

    # Field Mappings
    def add_id(self, source_df):
        naming = lambda x: "{}_{}".format(self.origin_name, x)
        vfunc = np.vectorize(naming)
        ids = vfunc(source_df['GLOBALEVENTID'])
        return ids.reshape((len(ids), 1))

    def add_importance(self, source_df):
        # goldstein = np.array(sigmoid(np.abs(source_df['GoldsteinScale'])-10))
        # Map goldstein on 0/1 scale
        importance = (np.abs(source_df['GoldsteinScale']) + 10) / 20
        return importance

    def add_sentiment_group(self, source_df):
        avgTone = np.array(source_df['AvgTone'])
        bins = [-100, -10, -1, 1, 10, 100]
        classes = np.digitize(avgTone, bins) - 3
        return classes

    def add_position(self, source_df):
        pass


if __name__ == '__main__':
    GDELTExtractor()
    pass
