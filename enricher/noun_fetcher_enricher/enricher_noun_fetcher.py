import logging

from newspaper import Article

from textblob import TextBlob
from enricher import Enricher
from googletrans import Translator

SERVICE_NAME = "enricher_noun_fetcher"


def _get_nouns(text):
    text_blob = TextBlob(text)
    return list(set(text_blob.noun_phrases))


def _get_article_text(url):
    if url is None:
        return ""

    article = Article(url)

    try:
        article.download()
        article.parse()
    except:
        print("Article could not be downloaded")
        return ""

    return article.text


class TitleToDescriptionEnricher(Enricher):

    def __init__(self):
        super(TitleToDescriptionEnricher, self).__init__(SERVICE_NAME)

    def enrich_event(self, event):
        print("Start Enriching")
        try:
            _source_fields = self._config.get('source_fields')
            _delimiter = self._config.get('delimiter') or "|"
        except AttributeError as e:
            print(e)
            return None
        
        text = ""

        for _f in _source_fields:
            try:
                text += _get_article_text(event.get(_f))
            except Exception as e:
                logging.error("Description could not be fetched {}".format(e))
                continue

        nouns = ' '.join(map(str, _get_nouns(text)))

        try:
            translator = Translator()
            nouns = translator.translate(nouns, dest='en')
            event['hidden_information'] = nouns.text
        except:
            event['hidden_information'] = nouns

        print(event['hidden_information'])
        return event


if __name__ == '__main__':
    TitleToDescriptionEnricher()
