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

    def add_actors(self, source_df):
        _actors = source_df.apply(self.get_actor_from_row, axis=1)
        print(_actors)
        return _actors

    @staticmethod
    def get_actor_from_row(row):

        _actors = []
        for i in range(1, 3):

            _actorprefix = "Actor{}".format(i)
            actor_code = row["{}Code".format(_actorprefix)]
            if actor_code:
                actor_ethic = row["{}EthnicCode".format(_actorprefix)]

                actor_country_code = row["{}Geo_CountryCode".format(_actorprefix)]
                actor_country_full = row["{}Geo_FullName".format(_actorprefix)]

                known_group_code = row["{}KnownGroupCode".format(_actorprefix)]
                actor_name_data = row["{}Name".format(_actorprefix)]

                religion1_code = row["{}Religion1Code".format(_actorprefix)]
                religion2_code = row["{}Religion2Code".format(_actorprefix)]

                type1_code = row["{}Type1Code".format(_actorprefix)]
                type2_code = row["{}Type2Code".format(_actorprefix)]
                type3_code = row["{}Type3Code".format(_actorprefix)]

                actor_name = "{}({})".format(actor_name_data, actor_code)
                actor_origin = '{}({})'.format(actor_country_full, actor_country_code)

                actor_group = ""
                if known_group_code:
                    actor_group += known_group_code + " "
                if actor_ethic:
                    actor_group += actor_ethic + " "
                if religion1_code:
                    actor_group += religion1_code + " "
                if religion2_code:
                    actor_group += religion2_code + " "

                actor_type = []
                if type1_code:
                    actor_type.append(type1_code)
                if type2_code:
                    actor_type.append(type2_code)
                if type3_code:
                    actor_type.append(type3_code)

                actor = {
                    "actor_name": actor_name,
                    "actor_origin": actor_origin,
                    "actor_group": actor_group,
                    "actor_type": actor_type
                }

                _actors.append(actor)

        return _actors


if __name__ == '__main__':
    GDELTExtractor()
    pass
