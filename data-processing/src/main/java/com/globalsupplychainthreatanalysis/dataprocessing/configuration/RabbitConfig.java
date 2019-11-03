package com.globalsupplychainthreatanalysis.dataprocessing.configuration;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    public static final String QUEUE = "direct_queue";

    @Bean
    public Queue Queue(){
        return new Queue(QUEUE, true);
    }
}
