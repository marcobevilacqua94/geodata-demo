package com.couchbase.demo.domain;

import java.util.Arrays;

import com.couchbase.client.java.json.JsonObject;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class CBComuneCoordinate {
    private Double[]  loc;

	private String name;
	
	public Double[] getLoc() {
		return loc;
	}

	public String getName() { return name;}


	public void setLoc(Double[] loc) {
		this.loc = loc;
	}

	public void setName(String name){
		this.name = name;
	}

	public CBComuneCoordinate(JsonObject json) {
		super();
		this.loc = new Double[2];
		this.loc[0] = json.getArray("loc").getDouble(0);
		this.loc[1] =  json.getArray("loc").getDouble(1);
		this.name = json.getString("comune");
	}


	@Override
	public String toString() {
		return "CBCoordinate [loc=" + Arrays.toString(loc) + "]";
	}

}
