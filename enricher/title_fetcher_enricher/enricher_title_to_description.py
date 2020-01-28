import logging

import lxml.html
from urllib.request import urlopen

from enricher import Enricher

SERVICE_NAME = "enricher_title_to_description"


def _get_title_of_source(field):
    if field is None:
        return None

    try:
        t = lxml.html.parse(urlopen(field))
    except OSError as e:
        return "no description accessible {}".format(e)
    try:
        title = t.find(".//title").text

    except AttributeError as e:
        return "No description accessible because source website does not have a title meta tag."

    return title


class TitleToDescriptionEnricher(Enricher):

    def __init__(self):
        super(TitleToDescriptionEnricher, self).__init__(SERVICE_NAME)

    def enrich_event(self, event):
        print("Start Enriching")
        _source_fields = self._config.get('source_fields')
        _delimiter = self._config.get('delimiter') or "|"

        assert _source_fields

        desc = ""

        for _f in _source_fields:
            try:
                desc += _get_title_of_source(event.get(_f))
                desc += " {} ".format(_delimiter)
            except:
                logging.error("Description could not be fetched")
                continue

        event['description'] = desc[:-len(_delimiter)]
        print(event['description'])
        return event


if __name__ == '__main__':
    TitleToDescriptionEnricher()
