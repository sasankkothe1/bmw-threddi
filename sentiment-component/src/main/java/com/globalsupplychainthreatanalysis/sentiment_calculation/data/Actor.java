package com.globalsupplychainthreatanalysis.sentiment_calculation.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Actor)) {
            return false;
        }
        Actor that = (Actor) o;
        return Objects.equals(actor_name, that.actor_name) &&
                Objects.equals(actor_origin, that.actor_origin) &&
                Objects.equals(actor_group, that.actor_group) &&
                Arrays.equals(actor_type, that.actor_type);
    }
}
