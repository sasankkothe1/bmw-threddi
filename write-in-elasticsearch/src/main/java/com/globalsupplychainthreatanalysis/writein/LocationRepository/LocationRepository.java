package com.globalsupplychainthreatanalysis.writein.LocationRepository;

import com.alibaba.fastjson.JSONObject;
import com.globalsupplychainthreatanalysis.writein.data.LocationResponse;
import com.globalsupplychainthreatanalysis.writein.data.MainLocation;
import com.globalsupplychainthreatanalysis.writein.data.Source;
import com.nimbusds.jwt.SignedJWT;
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
import java.util.Set;

public class LocationRepository {

    Logger logger = LoggerFactory.getLogger(LocationRepository.class);

    private static String USERNAME = "write_in_service@test.com";
    private static String PASSWORD = "password1234";

    @Value(value = "${backend.administrator.endpoint}")
    private String administratorEndpoint;
    @Value(value = "${backend.location.endpoint}")
    private String locationEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    private String token;

    public List<MainLocation> requestLocations() throws Exception{
        try{
            JSONObject body = new JSONObject();
            HttpHeaders headers = new HttpHeaders();
            if( token == null || SignedJWT.parse(token).getJWTClaimsSet().getExpirationTime().getTime() < System.currentTimeMillis() ){
                logger.info("No valid token");
                this.token = requestToken();
            }
            headers.set("Authentication", "Bearer " + token);
            HttpEntity<JSONObject> request = new HttpEntity<>(body, headers);
            ResponseEntity<List<LocationResponse>> response = restTemplate.exchange(locationEndpoint, HttpMethod.GET, request, new ParameterizedTypeReference<List<LocationResponse>>() {});
            List<MainLocation> locations = new ArrayList<>();
            for(LocationResponse l : response.getBody()){
                locations.add(l.get_source().getMainLocation());
            }

            return locations;
        } catch(HttpClientErrorException | HttpServerErrorException e) {
            logger.info("Backend rejects request");
            throw new RuntimeException("Somethings went wrong during request Token " + e.getMessage());
        }
    }

    //hold token back
    private String requestToken() {
        JSONObject body = new JSONObject();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        body.put("username", USERNAME);
        body.put("password", PASSWORD);

        HttpEntity<JSONObject> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(administratorEndpoint + "login", HttpMethod.POST, request, String.class);
            String token = response.getBody();
            return token;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            if (e.getRawStatusCode() == 404) {
                return register();
            }
            throw new RuntimeException("unexpected error happened");
        }
    }
    // register an account in backend
    private String register(){
        JSONObject body = new JSONObject();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        body.put("username", USERNAME);
        body.put("password", PASSWORD);
        HttpEntity<JSONObject> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(administratorEndpoint + "register", HttpMethod.POST, request, String.class);
            String token = response.getBody();
            return token;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new RuntimeException("unexpected error happened");
        }
    }
}
