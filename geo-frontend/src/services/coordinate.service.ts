import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CoordinateService {
    constructor(private httpclient: HttpClient){

    }

    getCoordinates(name:String, polygon: String): Observable<Coordinate[]>{
        const url = "http://localhost:8080";
        return this.httpclient.get<Coordinate[]>(url +  "/coordinates?name="+name+"&points="+polygon);
    }
}

export interface Coordinate {
    loc: number[]
}
