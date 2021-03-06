package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Event implements Serializable {

    private Set<Actor> actors;
    private String lat;
    private String id;
    private String Long;
    private int sentiment_group;
    private String url;
    private String description;
    private float importance;
    private String origin;
    private Set<Dependency> source_dependent_information;
    private String timestamp;
    private LocationInfo location_info;
    private String hidden_information;

    public void setHidden_information(String hidden_information){
        this.hidden_information = hidden_information;
    }

    public String getHidden_information(){
        return this.hidden_information;
    }

    public void getTimeStamp(String timestamp){
        this.timestamp = timestamp;
    }

    public void setTimeStamp(String timestamp){
        this.timestamp = timestamp;
    }

    public void setActor(Set<Actor> actors) {
        this.actors = actors;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    @JsonSetter(value = "long")
    public void setLong(String Long) {
        this.Long = Long;
    }

    public void setSentiment_group(int sentiment_group) {
        this.sentiment_group = sentiment_group;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImportance(float importance) {
        this.importance = importance;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Actor> getActors() {
        return actors;
    }

    public String getLat() {
        return lat;
    }

    @JsonGetter(value = "long")
    public String getLong() {
        return Long;
    }

    public int getSentiment_group() {
        return sentiment_group;
    }

    public String getUrl() {
        return url;
    }

    public String getDescription() {
        return description;
    }

    public float getImportance() {
        return importance;
    }

    public String getOrigin() {
        return origin;
    }

    public String getId() {
        return id;
    }

    public void setSource_dependent_information(Set<Dependency>  source_dependent_information) {
        this.source_dependent_information = source_dependent_information;
    }

    public void setActors(Set<Actor> actors) {
        this.actors = actors;
    }

    public void setLocationInfo(LocationInfo location_info) {
        this.location_info = location_info;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public LocationInfo getLocation_info() {
        return location_info;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Set<Dependency> getSource_dependent_information() {
        return source_dependent_information;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Event)) {
            return false;
        }
        Event that = (Event) o;
        return  Objects.equals(lat, that.lat) &&
                Objects.equals(id, that.id) &&
                Objects.equals(Long, that.Long) &&
                Objects.equals(sentiment_group, that.sentiment_group) &&
                Objects.equals(url, that.url) &&
                Objects.equals(description, that.description) &&
                Objects.equals(importance, that.importance) &&
                Objects.equals(origin, that.origin) &&
                Objects.equals(timestamp, that.timestamp)
                ;
    }


}
