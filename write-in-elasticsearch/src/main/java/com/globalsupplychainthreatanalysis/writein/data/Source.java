package com.globalsupplychainthreatanalysis.writein.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Source {
    private MainLocation mainLocation;

    public Source(){}

    public void setMainLocation(MainLocation mainLocation) {
        this.mainLocation = mainLocation;
    }

    public MainLocation getMainLocation() {
        return mainLocation;
    }
}
