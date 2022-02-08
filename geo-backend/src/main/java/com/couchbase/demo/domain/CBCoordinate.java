package com.couchbase.demo.domain;

import java.util.Arrays;

import com.couchbase.client.java.json.JsonObject;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class CBCoordinate {
    private Double[]  loc;

	
	public Double[] getLoc() {
		return loc;
	}


	public void setLoc(Double[] loc) {
		this.loc = loc;
	}


	public CBCoordinate(JsonObject json) {
		super();
		this.loc = new Double[2];
		this.loc[0] = json.getArray("loc").getDouble(0);
		this.loc[1] =  json.getArray("loc").getDouble(1);
	}


	@Override
	public String toString() {
		return "CBCoordinate [loc=" + Arrays.toString(loc) + "]";
	}

}
