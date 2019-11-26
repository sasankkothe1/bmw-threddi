package com.globalsupplychainthreatanalysis.dataprocessing.controller;

import com.globalsupplychainthreatanalysis.dataprocessing.data.Event;
import com.globalsupplychainthreatanalysis.dataprocessing.elasticsearch.ElasticSearchRepository;
import org.elasticsearch.action.index.IndexResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping(value = "/")
public class BasicController {

    @Autowired
    ElasticSearchRepository elasticSearchRepository;

    @RequestMapping(method =  RequestMethod.GET, path = "test")
    public IndexResponse test() {
        Event event = new Event();
        event.setId(UUID.randomUUID().toString());
        event.setDescription("abcde");
        try {
            return elasticSearchRepository.add("events", event);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

}
