FROM python:3.6



RUN mkdir extractor-mock

WORKDIR /usr/src/app/extractor-mock

COPY requirements.txt ./
COPY extractor_mock.py ./
COPY RabbitMQHandler.py ./
COPY sample_events.txt ./

ENV MODE=PROD
ENV PYTHONPATH .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "./extractor_mock.py"]
#CMD tail -f /dev/null