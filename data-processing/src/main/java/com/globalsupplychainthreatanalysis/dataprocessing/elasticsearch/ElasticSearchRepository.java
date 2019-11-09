package com.globalsupplychainthreatanalysis.dataprocessing.elasticsearch;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.globalsupplychainthreatanalysis.dataprocessing.data.Message;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.DocWriteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.get.MultiGetRequest;
import org.elasticsearch.action.get.MultiGetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.support.replication.ReplicationResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.FetchSourceContext;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


import java.io.IOException;

public class ElasticSearchRepository {

    Logger logger = LoggerFactory.getLogger(ElasticSearchRepository.class);

    @Autowired
    private RestHighLevelClient highLevelClient;

    public Message find(String index, String id) throws IOException {
        GetRequest getRequest = new GetRequest(index, id);
        GetResponse response = highLevelClient.get(getRequest, RequestOptions.DEFAULT);
        return JSONObject.parseObject(response.getSourceAsBytes(), Message.class);
    }

    public IndexResponse add(String index, Message message) throws IOException {
        IndexRequest request = new IndexRequest(index).id(message.getId() + "").source(JSON.toJSONString(message), XContentType.JSON);

        request.timeout(TimeValue.timeValueSeconds(10));
        //ShardId shardId = new ShardId(new Index("my-shard", "uuid"), 10);
        //request.setShardId(shardId);
        IndexResponse indexResponse = highLevelClient.index(request, RequestOptions.DEFAULT);
        DocWriteResponse.Result indexResponseResult = indexResponse.getResult();
        if (indexResponseResult == DocWriteResponse.Result.CREATED) {
            // todo if created
        } else if (indexResponseResult == DocWriteResponse.Result.UPDATED) {
            // todo if updated
        }
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

    public MultiGetResponse query() throws IOException {

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        // search with query
        sourceBuilder.query(QueryBuilders.termQuery("user", "kimchy"));

        //
        sourceBuilder.fetchSource(true);

        // with id descending
        sourceBuilder.sort("id", SortOrder.DESC);
        String[] includeFields = new String[]{"title", "innerObject.*"};
        String[] excludeFields = new String[]{"user"};

        //
        sourceBuilder.fetchSource(includeFields, excludeFields);

        // Highlight
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        HighlightBuilder.Field highlightTitle = new HighlightBuilder.Field("title");
        // highlight type
        highlightTitle.highlighterType("unified");
        highlightBuilder.field(highlightTitle);
        sourceBuilder.highlighter(highlightBuilder);

        // page size
        sourceBuilder.from(1);
        sourceBuilder.size(10);

        // powerset
        sourceBuilder.minScore(1.2F);

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.source(sourceBuilder);
        highLevelClient.searchAsync(searchRequest, RequestOptions.DEFAULT, new ActionListener<SearchResponse>() {
            @Override
            public void onResponse(SearchResponse searchResponse) {
                logger.info("successful - [{}]", searchResponse);
            }

            @Override
            public void onFailure(Exception e) {
                logger.error("failed ", e);
            }
        });


        MultiGetRequest request = new MultiGetRequest();
        request.add(new MultiGetRequest.Item("message", "1"));
        request.add(new MultiGetRequest.Item("message", "2"));
        request.add(new MultiGetRequest.Item("message", "3")
                .fetchSourceContext(FetchSourceContext.DO_NOT_FETCH_SOURCE));
        return highLevelClient.mget(request, RequestOptions.DEFAULT);
    }
}
