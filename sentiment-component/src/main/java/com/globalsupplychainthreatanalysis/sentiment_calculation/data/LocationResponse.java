package com.globalsupplychainthreatanalysis.sentiment_calculation.data;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LocationResponse {
    private Source _source;
    public LocationResponse () {

    }

    public void set_source(Source _source) {
        this._source = _source;
    }

    public Source get_source() {
        return _source;
    }
}
