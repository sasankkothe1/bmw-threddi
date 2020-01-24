package com.globalsupplychainthreatanalysis.distance_calculation.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.distance_calculation.LocationRepository.LocationRepository;
import com.globalsupplychainthreatanalysis.distance_calculation.RabbitMQ.Sender;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@EnableAutoConfiguration
@Configuration
public class Config {

    Logger logger = LoggerFactory.getLogger(Config.class);

    @Value(value = "${rabbit.mq.topic-exchange-name}")
    private String TOPIC_EXCHANGE_NAME;

    @Value(value = "${rabbit.mq.routing-key}")
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
    public LocationRepository locationRepositoryBuilder(){
        return new LocationRepository();
    }

    @Bean @Qualifier("restTemplate")
    public RestTemplate buildRestTemplate(@Autowired HttpComponentsClientHttpRequestFactory factory) {
        RestTemplate template = new RestTemplate();
        template.setRequestFactory(factory);

        List<HttpMessageConverter<?>> convs = new ArrayList<>();
        convs.add(new MappingJackson2HttpMessageConverter());
        convs.add(new FormHttpMessageConverter());
        convs.add(new ByteArrayHttpMessageConverter());
        convs.add(new Jaxb2RootElementHttpMessageConverter());
        convs.add(new StringHttpMessageConverter());
        convs.add(new ResourceHttpMessageConverter());
        convs.add(new SourceHttpMessageConverter());
        convs.add(new AllEncompassingFormHttpMessageConverter());
        template.setMessageConverters(convs);

        return template;
    }

    @Bean
    public HttpComponentsClientHttpRequestFactory buildHttpComponentsClientHttpRequestFactory() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        return factory;
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

}
