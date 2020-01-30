package com.globalsupplychainthreatanalysis.sentiment_calculation.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.sentiment_calculation.RabbitMQ.Sender;
import com.globalsupplychainthreatanalysis.sentiment_calculation.analysis.SentimentAnalyzerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@Configuration
public class Config {

    Logger logger = LoggerFactory.getLogger(Config.class);

    @Value(value = "${rabbit.mq.topic_exchange_name}")
    private String TOPIC_EXCHANGE_NAME;

    @Value(value = "${rabbit.mq.routing_key}")
    private String routingKey;

    public static final String QUEUE = "distances";

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

    @Bean
    public MessageConverter messageConverter()
    {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }

    @Bean
    public Sender senderBuilder(){
        return new Sender();
    }

    @Bean
    public SentimentAnalyzerService sentimentAnalyzerServiceBuilder(){
        return new SentimentAnalyzerService();
    }
}
