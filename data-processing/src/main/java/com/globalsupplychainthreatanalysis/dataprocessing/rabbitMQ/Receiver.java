package com.globalsupplychainthreatanalysis.dataprocessing.rabbitMQ;

import com.globalsupplychainthreatanalysis.dataprocessing.configuration.RabbitConfig;
import com.globalsupplychainthreatanalysis.dataprocessing.data.Message;
import com.globalsupplychainthreatanalysis.dataprocessing.elasticsearch.ElasticSearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void receiveDirectQueue(Message message){
        logger.info("received message" + message.getMessage());
    }
}
