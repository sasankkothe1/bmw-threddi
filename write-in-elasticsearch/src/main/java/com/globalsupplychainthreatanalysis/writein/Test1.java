package com.globalsupplychainthreatanalysis.writein;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalsupplychainthreatanalysis.writein.RabbitMQ.Receiver;
import com.globalsupplychainthreatanalysis.writein.data.Event;
import com.globalsupplychainthreatanalysis.writein.data.LocationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.SerializationUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Test1 {

    @Autowired
    private Receiver receiver;
    ObjectMapper objectMapper = new ObjectMapper();
    @RequestMapping("/test")
    public void test(){
        List l = new ArrayList<Event>();
        Event event = new Event();
        event.setId("e0000001");
        event.setLat("22.302711");
        event.setLong("114.177216");
        receiver.receiveDirectQueue(event);
    }
}
