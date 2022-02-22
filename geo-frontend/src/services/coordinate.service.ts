import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CoordinateService {
    constructor(private httpclient: HttpClient){

    }

    getCoordinates(startDate:String, endDate:String, polygon: String): Observable<Coordinate[]>{
        const url = "http://localhost:8080";
        return this.httpclient.get<Coordinate[]>(url +  "/coordinates?startDate="+startDate+"&endDate="+endDate+"&points="+polygon);
    }
}

export interface Coordinate {
    loc: number[]
}