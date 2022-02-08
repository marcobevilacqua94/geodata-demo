package com.couchbase.demo;

import com.couchbase.client.java.Bucket;
import com.couchbase.client.java.Cluster;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GeoDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeoDemoApplication.class, args);
	}

	/**
	 * This is a Spring Java Configuration method (as indicated by the @Bean annotation). The general behavior
	 * is to to pass in values obtained either from other Spring objects (called Spring Beans) or from values
	 * that can be obtained from the environment variables or properties in an application.properties file.
	 *
	 * This specific method takes three arguments provided by values in the application.properties file as
	 * outlined below
	 *
	 * @param hostname Populated with the value in the application.properties file named 'couchbase.clusterHost'
	 * @param username Populated with the value in the application.properties file named 'couchbase.username'
	 * @param password Populated with the value in the application.properties file named 'couchbase.password'
	 * @return Instantiated and configured Couchbase Cluster object
	 */
	@Bean
	public Cluster cluster(@Value("${couchbase.clusterHost}") String hostname, @Value("${couchbase.username}") String username,
						   @Value("${couchbase.password}") String password) {
		return Cluster.connect(hostname,username,password);
	}

	/**
	 * This is a Spring Java Configuration method (as indicated by the @Bean annotation). The general behavior
	 * is to to pass in values obtained either from other Spring objects (called Spring Beans) or from values
	 * that can be obtained from the environment variables or properties in an application.properties file.
	 *
	 * This specific method takes a Cluster object created by the 'cluster()' method above and managed by Spring
	 * and one argument provided by values in the application.properties file as outlined below
	 *
	 * @param cluster Couchbase Cluster object instantiated and managed by Spring and dependency injected here
	 * @param bucketName Populated with the value in the application.properties file named 'couchbase.bucket'
	 * @return result of obtaining the specified bucket from the Cluster
	 */
	@Bean
	public Bucket couchmusicBucket(Cluster cluster, @Value("${couchbase.bucket}") String bucketName) {
		return cluster.bucket(bucketName);
	}
}
