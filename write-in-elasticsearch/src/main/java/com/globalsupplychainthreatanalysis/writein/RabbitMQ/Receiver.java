package com.globalsupplychainthreatanalysis.writein.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.writein.LocationRepository.LocationRepository;
import com.globalsupplychainthreatanalysis.writein.configuration.RabbitConfig;
import com.globalsupplychainthreatanalysis.writein.data.Event;
import com.globalsupplychainthreatanalysis.writein.data.LocationInfo;
import com.globalsupplychainthreatanalysis.writein.data.MainLocation;
import com.globalsupplychainthreatanalysis.writein.elasticsearch.ElasticSearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.xml.stream.Location;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
@Slf4j
public class Receiver {
    Logger logger = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    @Autowired
    LocationRepository locationRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    private static final double EARTH_RADIUS = 6378137;
    private static final double RAD = Math.PI / 180.0;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void receiveDirectQueue(byte[] eventsInByte) {
        List<MainLocation> locations;
        try {
            locations = locationRepository.requestLocations();
        } catch(Exception e){
            logger.error("Failed to read locations from backend");
            throw new RuntimeException("");
        }

        if(locations.size() == 0 ) {
            logger.error("No locations saved in backend");
        }

        try {
            List<Event> events = objectMapper.readValue(eventsInByte, objectMapper.getTypeFactory().constructCollectionType(List.class, Event.class));
            logger.info("received events + number" + events.size());
            for(Event event : events) {
                if (event.getId() == null) {
                    UUID uuid = UUID.randomUUID();
                    event.setId(uuid.toString());
                }


                if(!elasticSearchRepository.find("events", event.getId())){
                    LocationInfo locationInfo = getNearestFacility(locations, event);
                    event.setLocationInfo(locationInfo);
                    elasticSearchRepository.add("events", event);
                }


            }
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
        for(MainLocation mainLocation : locations){
            double distance = getDistance(Double.valueOf(mainLocation.getLong()), Double.valueOf(mainLocation.getLat()), Double.valueOf(event.getLong()), Double.valueOf(event.getLat()));
            if(locationInfo.getDistance() == null || Double.valueOf(locationInfo.getDistance()) > distance){
                locationInfo.setDistance("" + distance);
                locationInfo.setLocation_id(mainLocation.getLocation_id());
            }
        }
        return locationInfo;
    }
}
