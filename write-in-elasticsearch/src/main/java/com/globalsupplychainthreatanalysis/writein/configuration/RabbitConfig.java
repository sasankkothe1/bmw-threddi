package com.globalsupplychainthreatanalysis.writein.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.*;
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
    public TopicExchange topicBuilder() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME, false, false);
    }

    @Bean
    public Queue autoDeleteQueue1() {
        return new AnonymousQueue();
    }


    @Bean
    public Binding binding1a(TopicExchange topic,
                             Queue autoDeleteQueue1) {
        return BindingBuilder.bind(autoDeleteQueue1)
                .to(topic)
                .with(routingKey);
    }


    @Bean
    public ObjectMapper objectMapperBuilder() {
        return new ObjectMapper();
    }
}
