package com.couchbase.demo.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.couchbase.client.core.error.CouchbaseException;
import com.couchbase.client.java.Bucket;
import com.couchbase.client.java.Cluster;
import com.couchbase.client.java.json.JsonObject;
import com.couchbase.client.java.search.SearchOptions;
import com.couchbase.client.java.search.SearchQuery;
import com.couchbase.client.java.search.queries.ConjunctionQuery;
import com.couchbase.client.java.search.result.SearchResult;
import com.couchbase.client.java.search.result.SearchRow;
import com.couchbase.client.java.util.Coordinate;
import com.couchbase.demo.domain.CBCoordinate;

@Repository
public class CoordinateListRepository {
    private final Cluster cluster;

    /**
     * This constructor receives values that are Spring beans and are automatically
     * dependency injected during the lifecycle processing of the Spring container.
     *
     * @param cluster Cluster object that was configured as a Spring bean and autowired in
     * @param playlistBucket Bucket object that was configured as a Spring bean and autowired in
     */
    public CoordinateListRepository(Cluster cluster, Bucket bucket) {
        this.cluster = cluster;
    }


    public List<CBCoordinate> getFTSData(String nameString, List<Coordinate> points) {
        // TODO-02: Implement the functionality to get a Document and return as string
        //          Be sure to handle exceptions.
        List<CBCoordinate> jsonGeolist = new ArrayList<CBCoordinate>();
       
        try {
            SearchQuery name = null;
            if(nameString == null || nameString.trim().length() == 0){
                return jsonGeolist;
            } else {
                name = SearchQuery.match(nameString).field("comune");
            }
            final SearchResult result = !points.isEmpty() ? cluster.searchQuery("comuniIndex",
                    SearchQuery.conjuncts(SearchQuery.geoPolygon(points).field("loc"),name), SearchOptions.searchOptions().limit(8000).
                    fields("comune","loc"))
                    :
                    cluster.searchQuery("comuniIndex", name, SearchOptions.searchOptions().limit(8000).
                    fields("comune","loc"));
            System.out.println( " result == " + result.rows().size() ) ;
            for (SearchRow row : result.rows()) {
            	CBCoordinate cb = new CBCoordinate(row.fieldsAs(JsonObject.class));
            	jsonGeolist.add(cb);
            }

           // System.out.println("Reported total rows: " + result.metaData().metrics().totalRows());
        } catch (CouchbaseException ex) {
            ex.printStackTrace();
        }
        return jsonGeolist;
    }

}
