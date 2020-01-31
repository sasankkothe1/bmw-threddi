import logging


from googletrans import Translator

from enricher import Enricher

SERVICE_NAME = "enricher_translator"


def _translate(field):

    translator = Translator()
    translation = translator.translate(field, dest='en')
    print("{} (from {})".format(translation.text, translation.src))

    return translation.text,  translation.src


class TranslatorEnricher(Enricher):

    def __init__(self):
        super(TranslatorEnricher, self).__init__(SERVICE_NAME)

    def enrich_event(self, event):
        print("Start Enriching")
        _source_fields = self._config.get('source_fields') or []
        _delimiter = self._config.get('delimiter') or "|"

        assert _source_fields

        for _f in _source_fields:
            try:
                translated_text, src = _translate(event.get(_f))
                event[_f] = "{} (translated from )".format(translated_text, src)
            except:
                logging.error("Translation could not be done")
                continue

        return event


if __name__ == '__main__':
    TranslatorEnricher()
