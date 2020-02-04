package com.globalsupplychainthreatanalysis.distance_calculation.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.distance_calculation.LocationRepository.LocationRepository;
import com.globalsupplychainthreatanalysis.distance_calculation.configuration.Config;
import com.globalsupplychainthreatanalysis.distance_calculation.data.Event;
import com.globalsupplychainthreatanalysis.distance_calculation.data.LocationInfo;
import com.globalsupplychainthreatanalysis.distance_calculation.data.MainLocation;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Envelope;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    private List<MainLocation> locations;

    @Autowired
    LocationRepository locationRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    Sender sender;

    private static final double EARTH_RADIUS = 6378137;
    private static final double RAD = Math.PI / 180.0;

    @RabbitListener(queues = "#{autoDeleteQueue1.name}")
    public void receiveDirectQueue(Message message) {
        String routingKey = message.getMessageProperties().getReceivedRoutingKey();
        String nextRoutingKey = routingKey.split("\\.", 2)[1];
        try {
            locations = locationRepository.requestLocations();
        } catch (Exception e) {
            logger.error("Failed to read locations from backend");
            throw new RuntimeException("");
        }

        if (locations.size() == 0) {
            logger.error("No locations saved in backend");
        }

        try {
            Event event = objectMapper.readValue(message.getBody(), Event.class);
            if (event.getId() == null) {
                UUID uuid = UUID.randomUUID();
                event.setId(uuid.toString());
            }

            LocationInfo locationInfo = getNearestFacility(locations, event);
            event.setLocationInfo(locationInfo);
            sender.send(event, nextRoutingKey);

        } catch (IOException e) {
            logger.error("Failed to holds events from processing services" + e.getMessage());
        }
    }

    //return distance in km
    private static Double getDistance(Double lng1, Double lat1, Double lng2, Double lat2) {
        double radLat1 = lat1 * RAD;
        double radLat2 = lat2 * RAD;
        double a = radLat1 - radLat2;
        double b = (lng1 - lng2) * RAD;
        double s = 2 * Math.asin(Math.sqrt(
                Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000000.0;
        return s;
    }

    private LocationInfo getNearestFacility(List<MainLocation> locations, Event event){
        LocationInfo locationInfo = new LocationInfo();
        if(event.getLat() != null && event.getLong() != null) {
            for (MainLocation mainLocation : locations) {
                double distance = getDistance(Double.valueOf(mainLocation.getLong()), Double.valueOf(mainLocation.getLat()), Double.valueOf(event.getLong()), Double.valueOf(event.getLat()));

                if(event.getLocation_info() == null || Double.valueOf(event.getLocation_info().getDistance()) > distance) {
                    locationInfo.setDistance("" + distance);
                    locationInfo.setLocation_id(mainLocation.getLocation_id());
                    locationInfo.setName(mainLocation.getName());
                }

            }
        }
        return locationInfo;
    }
}
