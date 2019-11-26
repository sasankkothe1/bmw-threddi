package com.globalsupplychainthreatanalysis.dataprocessing.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.dataprocessing.configuration.RabbitConfig;
import com.globalsupplychainthreatanalysis.dataprocessing.data.Event;
import com.globalsupplychainthreatanalysis.dataprocessing.elasticsearch.ElasticSearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void receiveDirectQueue(byte[] eventsInByte) {

        try {
            List<Event> events = objectMapper.readValue(eventsInByte, objectMapper.getTypeFactory().constructCollectionType(List.class, Event.class));
            logger.info("received events + number" + events.size());
            for(Event event : events) {
                if (event.getId() == null) {
                    UUID uuid = UUID.randomUUID();
                    event.setId(uuid.toString());
                }
                elasticSearchRepository.add("events", event);
            }
        } catch (IOException e) {
            logger.error("Failed to holds events from processing services" + e.getMessage());
        }
//
//        try {
//
//        } catch (IOException e) {
//            logger.error("Failed to add event in elasticsearch" + event.getDescription());
//        }
    }
}
