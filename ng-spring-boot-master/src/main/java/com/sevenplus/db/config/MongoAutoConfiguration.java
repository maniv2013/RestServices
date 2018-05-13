package com.sevenplus.db.config;



import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Configuration
@EnableMongoRepositories(basePackages="com.sevenplus.db.repository")
@EnableTransactionManagement
//@EnableMongoAuditing(auditorAwareRef = "springSecurityAuditorAware")
public class MongoAutoConfiguration extends AbstractMongoConfiguration {
	
	private final Logger log = LoggerFactory.getLogger(MongoAutoConfiguration.class);
	
    /*@Value("${spring.data.mongodb.host}")
    private String host;
    
    @Value("${spring.data.mongodb.port}")
    private Integer port;
    
    @Value("${spring.data.mongodb.username}")
    private String username;*/
    
    @Value("${spring.data.mongodb.database:fitnessdb}")
    private String database;
    
    /*@Value("${spring.data.mongodb.password}")
    private String password;*/
    
    @Value("${spring.data.mongodb.uri}")
    private String uri;
    
    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }
    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
    
    @Bean
    public MongoClientOptions mongoOptions() {
        return MongoClientOptions.builder().socketTimeout(30000).build();
    }

	@Override
	protected String getDatabaseName() {
		return database;
	}

	@Override
	public Mongo mongo() throws Exception {
		return new MongoClient(new MongoClientURI(uri));
		/*return new MongoClient(Collections.singletonList(new ServerAddress(host, port)),
				Collections.singletonList(MongoCredential.createCredential(username,database, password.toCharArray())));*/
	}

}
