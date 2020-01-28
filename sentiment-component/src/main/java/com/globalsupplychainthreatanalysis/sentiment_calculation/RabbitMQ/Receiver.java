package com.globalsupplychainthreatanalysis.sentiment_calculation.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.sentiment_calculation.analysis.SentimentAnalyzerService;
import com.globalsupplychainthreatanalysis.sentiment_calculation.data.Event;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    private Logger logger = LoggerFactory.getLogger(Receiver.class);

    private SentimentAnalyzerService sentimentAnalyzerService = new SentimentAnalyzerService();

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    Sender sender;

    private static final double EARTH_RADIUS = 6378137;
    private static final double RAD = Math.PI / 180.0;

    @RabbitListener(queues = "#{autoDeleteQueue1.name}")
    public void receiveDirectQueue(Message message) {
        String routingKey = message.getMessageProperties().getReceivedRoutingKey();

        String nextRoutingKey = routingKey.split("\\.", 2)[1];

        try {
            Event event = objectMapper.readValue(message.getBody(), Event.class);
            if (event.getId() == null) {
                UUID uuid = UUID.randomUUID();
                event.setId(uuid.toString());
            }
            if (event.getId() == null) {
                UUID uuid = UUID.randomUUID();
                event.setId(uuid.toString());
            }
            //this method return value from 0 - 4
            int sentiment = sentimentAnalyzerService.analyse(event.getDescription()) - 2;

            event.setSentiment_group(sentiment);
            sender.send(event, nextRoutingKey);

        } catch (IOException e) {
            logger.error("Failed to holds events from processing services" + e.getMessage());
        }
    }

}
