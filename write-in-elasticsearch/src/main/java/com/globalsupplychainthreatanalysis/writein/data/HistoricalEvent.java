package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HistoricalEvent {
    private long timestamp;
    private int event_count;

    public HistoricalEvent (){

    }

    public int getEvent_count() {
        return event_count;
    }

    public void setEvent_count(int event_count) {
        this.event_count = event_count;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
