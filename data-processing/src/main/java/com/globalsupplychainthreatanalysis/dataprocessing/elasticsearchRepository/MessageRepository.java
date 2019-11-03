package com.globalsupplychainthreatanalysis.dataprocessing.elasticsearchRepository;
import com.globalsupplychainthreatanalysis.dataprocessing.data.Message;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


public interface MessageRepository extends ElasticsearchRepository<Message, Long> {}