package com.globalsupplychainthreatanalysis.writein.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.writein.data.Event;
import com.globalsupplychainthreatanalysis.writein.elasticsearch.ElasticSearchRepository;
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
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    private static final double EARTH_RADIUS = 6378137;
    private static final double RAD = Math.PI / 180.0;

    @RabbitListener(queues = "#{autoDeleteQueue1.name}")
    public void receiveDirectQueue(Message message) {
        try {
            Event event = objectMapper.readValue(message.getBody(), Event.class);
            if (event.getId() == null) {
                UUID uuid = UUID.randomUUID();
                event.setId(uuid.toString());
            }
            Event oldEvent = elasticSearchRepository.find("events", event.getId());
            if (oldEvent == null) {
                elasticSearchRepository.add("events", event);
            } else {
                if (!oldEvent.equals(event)) {
                    if (oldEvent.getLocationInfo().getDistance() != null) {
                        if (event.getLocationInfo().getDistance() == null) {
                            event.setLocationInfo(oldEvent.getLocationInfo());
                        } else {
                            if (event.getLocationInfo().getDistance() != null && Double.valueOf(oldEvent.getLocationInfo().getDistance()) < Double.valueOf(event.getLocationInfo().getDistance())) {
                                event.setLocationInfo(oldEvent.getLocationInfo());
                            }
                        }
                    }
                    elasticSearchRepository.add("events", event);
                } else {
                    if (oldEvent.getLocationInfo().getDistance() == null && event.getLocationInfo().getDistance() != null || (oldEvent.getLocationInfo().getDistance() != null && event.getLocationInfo().getDistance() != null &&
                            Double.valueOf(oldEvent.getLocationInfo().getDistance()) < Double.valueOf(event.getLocationInfo().getDistance()))) {
                        elasticSearchRepository.add("events", event);
                    }
                }
            }
        } catch (IOException e) {
            logger.error("Failed to holds events from processing services" + e.getMessage());
        }
    }

}
