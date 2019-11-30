package com.globalsupplychainthreatanalysis.writein.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    Logger logger = LoggerFactory.getLogger(RabbitConfig.class);

    @Value(value = "${rabbit.mq.topic-exchange-name}")
    private String TOPIC_EXCHANGE_NAME;

    @Value(value = "${rabbit.mq.routing-key}")
    private String routingKey;

    public static final String QUEUE = "events";


    @Bean
    public Declarables topicBindings() {
        Queue topicQueue1 = new Queue(QUEUE, false);
        logger.info("Topic = " + TOPIC_EXCHANGE_NAME + " routing key = " + routingKey);
        TopicExchange topicExchange = new TopicExchange(TOPIC_EXCHANGE_NAME, false, false);
        return new Declarables(
                topicQueue1,
                topicExchange,
                BindingBuilder
                        .bind(topicQueue1)
                        //waiting for the rooting key name
                        .to(topicExchange).with(routingKey));
    }

    @Bean
    public ObjectMapper objectMapperBuilder(){
        return new ObjectMapper();
    }
}
