package com.couchbase.demo.data;

import java.util.*;

import com.couchbase.demo.domain.CBComuneCoordinate;
import org.springframework.stereotype.Repository;

import com.couchbase.client.core.error.CouchbaseException;
import com.couchbase.client.java.Bucket;
import com.couchbase.client.java.Cluster;
import com.couchbase.client.java.json.JsonObject;
import com.couchbase.client.java.search.SearchOptions;
import com.couchbase.client.java.search.SearchQuery;
import com.couchbase.client.java.search.result.SearchResult;
import com.couchbase.client.java.search.result.SearchRow;
import com.couchbase.client.java.util.Coordinate;


@Repository
public class CoordinateListRepository {
    private final Cluster cluster;

    /**
     * This constructor receives values that are Spring beans and are automatically
     * dependency injected during the lifecycle processing of the Spring container.
     *
     * @param cluster Cluster object that was configured as a Spring bean and autowired in
     * @param bucket Bucket object that was configured as a Spring bean and autowired in
     */
    public CoordinateListRepository(Cluster cluster, Bucket bucket) {
        this.cluster = cluster;
    }


    public List<CBComuneCoordinate> getFTSData(String nameString, List<Coordinate> points) {
        // TODO-02: Implement the functionality to get a Document and return as string
        //          Be sure to handle exceptions.
        List<CBComuneCoordinate> jsonGeoList = new ArrayList<>();
       
        try {
            SearchQuery name;
            if(nameString == null || nameString.trim().length() == 0){
                return jsonGeoList;
            } else if(nameString.equals("*all*"))
            {
                name = SearchQuery.matchAll();
            }
            else
            {
                nameString = nameString.toLowerCase();
                name = SearchQuery.disjuncts(SearchQuery.match(nameString).field("comune"), SearchQuery.prefix(nameString).field("comune"), SearchQuery.queryString(nameString));
            }
            final SearchResult result = !points.isEmpty() ?

                    cluster.searchQuery("comuniIndex",
                    SearchQuery.conjuncts(
                            SearchQuery.geoPolygon(points).field("loc"),
                            name
                    ),
                            SearchOptions.searchOptions().limit(8000).
                    fields("comune","loc"))


                    :
                    cluster.searchQuery("comuniIndex", name, SearchOptions.searchOptions().limit(8000).
                    fields("comune","loc"));
            System.out.println( " result == " + result.rows().size() ) ;
            for (SearchRow row : result.rows()) {
            	CBComuneCoordinate cb = new CBComuneCoordinate(row.fieldsAs(JsonObject.class));
                jsonGeoList.add(cb);
            }

           // System.out.println("Reported total rows: " + result.metaData().metrics().totalRows());
        } catch (CouchbaseException ex) {
            ex.printStackTrace();
        }
        return jsonGeoList;
    }

}
