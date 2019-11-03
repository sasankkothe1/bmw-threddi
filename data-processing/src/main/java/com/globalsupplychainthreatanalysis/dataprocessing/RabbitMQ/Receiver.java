package com.globalsupplychainthreatanalysis.dataprocessing.RabbitMQ;

import com.globalsupplychainthreatanalysis.dataprocessing.configuration.RabbitConfig;
import com.globalsupplychainthreatanalysis.dataprocessing.data.Message;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void receiveDirectQueue(Message message){
        logger.info("received message" + message.getMessage());
    }
}
