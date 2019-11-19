package com.globalsupplychainthreatanalysis.dataprocessing.RabbitMQ;

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
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void receiveDirectQueue(Event event){
        logger.info("received event");
        if(event.getId() == null){
            UUID uuid = UUID.randomUUID();
            event.setId(uuid.toString());
        }
        try {
            elasticSearchRepository.add("security/events", event);
        } catch (IOException e) {
            logger.error("Failed to add event in elasticsearch");
        }
    }
}
