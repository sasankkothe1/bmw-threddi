package com.globalsupplychainthreatanalysis.dataprocessing.data;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Dependency implements Serializable {
    private String displayname;
    private String id;
    private String description;
    private String value;

    public Dependency(){

    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getDisplayname() {
        return displayname;
    }

    public String getValue() {
        return value;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDisplayName(String displayname) {
        this.displayname = displayname;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
