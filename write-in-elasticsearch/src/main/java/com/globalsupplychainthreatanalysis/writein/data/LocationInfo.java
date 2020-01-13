package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class LocationInfo {
    private String distance;
    private String location_id;
    private String address;

    public LocationInfo(){

    }

    public void setLocation_id(String location_id) {
        this.location_id = location_id;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation_id() {
        return location_id;
    }

    public String getDistance() {
        return distance;
    }

    public String getAddress() {
        return address;
    }
}
