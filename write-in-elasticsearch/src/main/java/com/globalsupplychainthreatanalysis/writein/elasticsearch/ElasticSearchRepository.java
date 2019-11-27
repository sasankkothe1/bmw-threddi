package com.globalsupplychainthreatanalysis.writein.elasticsearch;

import com.alibaba.fastjson.JSON;
import com.globalsupplychainthreatanalysis.writein.data.Event;
import org.elasticsearch.action.DocWriteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.support.replication.ReplicationResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


import java.io.IOException;

public class ElasticSearchRepository {

    Logger logger = LoggerFactory.getLogger(ElasticSearchRepository.class);

    @Autowired
    private RestHighLevelClient highLevelClient;

    public boolean find(String index, String id) {
        GetRequest getRequest = new GetRequest(index, id);
        try {
            GetResponse response = highLevelClient.get(getRequest, RequestOptions.DEFAULT);
            if(response.isExists()){
                return true;
            }
            return false;
//          return JSONObject.parseObject(response.getSourceAsBytes(), Event.class);
        }catch (IOException e){
            logger.error("error happens, when trying to find the event in elasticsearch");
            return false;
        }
    }

    public IndexResponse add(String index, Event event) throws IOException {
        IndexRequest request = new IndexRequest(index).id(event.getId() + "").source(JSON.toJSONString(event), XContentType.JSON);

        request.timeout(TimeValue.timeValueSeconds(10));
        IndexResponse indexResponse = highLevelClient.index(request, RequestOptions.DEFAULT);
        DocWriteResponse.Result indexResponseResult = indexResponse.getResult();
        //if (indexResponseResult == DocWriteResponse.Result.UPDATED) {
        //    logger.warn("Overwritten in event " + event.getId() + " reasons" + indexResponse.getShardInfo());
        //}
        ReplicationResponse.ShardInfo shardInfo = indexResponse.getShardInfo();
        if (shardInfo.getTotal() != shardInfo.getSuccessful()) {

        }
        if (shardInfo.getFailed() > 0) {
            for (ReplicationResponse.ShardInfo.Failure failure :
                    shardInfo.getFailures()) {
                String reason = failure.reason();
                logger.warn("failure reasons", reason);
            }
        }
        return indexResponse;

    }
}
