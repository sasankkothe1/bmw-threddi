package com.globalsupplychainthreatanalysis.dataprocessing.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    public static final String QUEUE = "events";
    public final static String TOPIC_EXCHANGE_NAME = "topic.exchange";

    @Value(value = "rabbit.mq.routing-key")
    private String routingKey;

    @Bean
    public Declarables topicBindings() {
        Queue topicQueue1 = new Queue(QUEUE, false);

        TopicExchange topicExchange = new TopicExchange(TOPIC_EXCHANGE_NAME, true, true);
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
