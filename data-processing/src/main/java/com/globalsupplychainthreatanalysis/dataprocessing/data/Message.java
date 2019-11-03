package com.globalsupplychainthreatanalysis.dataprocessing.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Document(indexName = "index", type = "type")
public class Message implements Serializable {

    private static final long serialVersionUID = -4388322243971196559L;
    private long id;
    private String messageId;
    private String message;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getMessage() {
        return message;
    }

    public String getMessageId() {
        return messageId;
    }
}
