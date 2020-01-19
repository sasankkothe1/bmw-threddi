package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MainLocation implements Serializable {
    private String location_id;
    private String lat;
    private String Long;
    private String name;

    public MainLocation () {

    }

    public String getName() {
        return name;
    }

    public String getLat() {
        return lat;
    }

    public String getLocation_id() {
        return location_id;
    }

    @JsonGetter(value = "long")
    public String getLong() {
        return Long;
    }

    @JsonSetter(value = "long")
    public void setLong(String Long) {
        this.Long = Long;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public void setLocation_id(String location_id) {
        this.location_id = location_id;
    }
}
