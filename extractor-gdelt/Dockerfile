FROM python:3.6



RUN mkdir extractor_gdelt

WORKDIR /usr/src/app/extractor_gdelt

COPY requirements.txt ./
COPY source.yaml ./
COPY extractor.py ./
COPY extractor_gdelt.py ./
COPY RabbitMQHandler.py ./


ENV MODE=PROD
ENV PYTHONPATH .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "./extractor_gdelt.py"]