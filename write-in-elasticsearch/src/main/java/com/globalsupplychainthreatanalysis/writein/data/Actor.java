package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Actor implements Serializable {
    private String actor_name;
    private String actor_origin;
    private String actor_group;
    private String[] actor_type;

    public Actor(){
    }

    public void setActor_group(String actor_group) {
        this.actor_group = actor_group;
    }

    public void setActor_name(String actor_name) {
        this.actor_name = actor_name;
    }

    public void setActor_origin(String actor_origin) {
        this.actor_origin = actor_origin;
    }

    public void setActor_type(String[] actor_type) {
        this.actor_type = actor_type;
    }

    public String getActor_group() {
        return actor_group;
    }

    public String getActor_name() {
        return actor_name;
    }

    public String getActor_origin() {
        return actor_origin;
    }

    public String[] getActor_type() {
        return actor_type;
    }
}
