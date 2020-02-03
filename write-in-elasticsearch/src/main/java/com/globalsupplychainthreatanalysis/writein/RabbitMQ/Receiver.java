package com.globalsupplychainthreatanalysis.writein.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.writein.data.Event;
import com.globalsupplychainthreatanalysis.writein.data.HistoricalEvent;
import com.globalsupplychainthreatanalysis.writein.elasticsearch.ElasticSearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    ObjectMapper objectMapper = new ObjectMapper();



    private static final double EARTH_RADIUS = 6378137;
    private static final double RAD = Math.PI / 180.0;

    @RabbitListener(queues = "#{autoDeleteQueue1.name}")
    public void receiveDirectQueue(Message message) {
        logger.info("received a message with the routing key" + message.getMessageProperties().getReceivedRoutingKey());
        try {
            Event event = objectMapper.readValue(message.getBody(), Event.class);
            if (event.getId() == null) {
                UUID uuid = UUID.randomUUID();
                event.setId(uuid.toString());
            }
            Event oldEvent = elasticSearchRepository.findEvent("events", event.getId());
            if (oldEvent == null) {
                elasticSearchRepository.addEvent("events", event);
                long t = getStartOfTheDay();
                HistoricalEvent historicalEvent = elasticSearchRepository.findHistoricalEvent("historical_events", "" + t);
                if(historicalEvent == null){
                    historicalEvent = new HistoricalEvent();
                    historicalEvent.setTimestamp(t);
                }
                historicalEvent.setEvent_count(historicalEvent.getEvent_count() + 1);
                elasticSearchRepository.addHistoricalEvent("historical_events", historicalEvent);
            } else {
//                if (!oldEvent.equals(event)) {
//                    if (oldEvent.getLocation_info().getDistance() != null) {
//                        if (event.getLocation_info().getDistance() == null) {
//                            event.setLocationInfo(oldEvent.getLocation_info());
//                        } else {
//                            if (event.getLocation_info().getDistance() != null && Double.valueOf(oldEvent.getLocation_info().getDistance()) < Double.valueOf(event.getLocation_info().getDistance())) {
//                                event.setLocationInfo(oldEvent.getLocation_info());
//                            }
//                        }
//                    }
//                    elasticSearchRepository.addEvent("events", event);
//                } else {
                if (event.getLocation_info() != null && oldEvent.getLocation_info() == null ||
                        (oldEvent.getLocation_info().getDistance() == null && event.getLocation_info().getDistance() != null)
                        || (oldEvent.getLocation_info().getDistance() != null && event.getLocation_info().getDistance() != null &&
                        Double.valueOf(oldEvent.getLocation_info().getDistance()) < Double.valueOf(event.getLocation_info().getDistance()))) {
                    oldEvent.setLocationInfo(event.getLocation_info());
                    elasticSearchRepository.addEvent("events", oldEvent);
                }
            }
        } catch (IOException e) {
            logger.error("Failed to holds objects from processing services" + e.getMessage());
        }
    }
    private long getStartOfTheDay(){
        //get current timestamp
        long currentTimestamp = System.currentTimeMillis();

        //translate it into local datetime
        LocalDateTime triggerTime =
                LocalDateTime.ofInstant(Instant.ofEpochMilli(currentTimestamp),
                        TimeZone.getDefault().toZoneId());

        //get the start of the day, which is used as the objectId
        Timestamp timestamp = Timestamp.valueOf(triggerTime.toLocalDate().atStartOfDay());
        return timestamp.getTime();
    }
}
