package com.globalsupplychainthreatanalysis.distance_calculation.LocationRepository;

import com.alibaba.fastjson.JSONObject;
import com.globalsupplychainthreatanalysis.distance_calculation.data.LocationResponse;
import com.globalsupplychainthreatanalysis.distance_calculation.data.MainLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

public class LocationRepository {

    Logger logger = LoggerFactory.getLogger(LocationRepository.class);

    private static final String authenticationType = "service";

    @Value(value = "${backend.authentication.code}")
    private String authenticationCode;
    @Value(value = "${backend.administrator.endpoint}")
    private String administratorEndpoint;
    @Value(value = "${backend.location.endpoint}")
    private String locationEndpoint;

    @Autowired
    private RestTemplate restTemplate;


    public List<MainLocation> requestLocations() throws Exception{
        try {
            JSONObject body = new JSONObject();
            HttpHeaders headers = new HttpHeaders();
            headers.set("authentication_type", authenticationType);
            headers.set("Authentication", authenticationCode);
            HttpEntity<JSONObject> request = new HttpEntity<>(body, headers);
            ResponseEntity<List<LocationResponse>> response = restTemplate.exchange(locationEndpoint, HttpMethod.GET, request, new ParameterizedTypeReference<List<LocationResponse>>() {
            });
            List<MainLocation> locations = new ArrayList<>();
            for (LocationResponse l : response.getBody()) {
                locations.add(l.get_source().getMainLocation());
            }

            return locations;
        } catch(HttpClientErrorException | HttpServerErrorException e) {
            logger.info("Backend rejects request");
            throw new RuntimeException("Somethings went wrong during request Token " + e.getMessage());
        }
    }

}
