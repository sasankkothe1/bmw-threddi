package com.globalsupplychainthreatanalysis.sentiment_calculation.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Objects;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class LocationInfo {
    private String distance;
    private String location_id;
    private String name;

    public LocationInfo(){

    }

    public void setLocation_id(String location_id) {
        this.location_id = location_id;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation_id() {
        return location_id;
    }

    public String getDistance() {
        return distance;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof LocationInfo)) {
            return false;
        }
        LocationInfo that = (LocationInfo) o;
        return Objects.equals(location_id, that.location_id) &&
                Objects.equals(distance, that.distance) &&
                Objects.equals(name, that.name);
    }
}
