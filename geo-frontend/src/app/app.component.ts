import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Coordinate, CoordinateService } from 'src/services/coordinate.service';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  title = 'geo-frontend';
  private map: Leaflet.Map;

  coordinates: Coordinate[]= [];
  points: Leaflet.LatLng[] = [];

  constructor(private _coordinateService: CoordinateService) { 
  }


  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.points);
  }

  ngOnInit(): void {
  }

  getCoordinate(input: any) {
    this.map.remove();
    this.initMap();
    this.points = [];
    let tempPoints = input.polygon.substring(1, input.polygon.length-1).split("),(");
    tempPoints.forEach((element:string) => {
      this.points.push(new Leaflet.LatLng(Number(element.split(",")[1]), Number(element.split(",")[0])));
    });
    this.drawPolygon(this.points);
    this._coordinateService.getCoordinates(input.startDate, input.endDate, input.polygon).subscribe((data) => {
      this.drawCircles(data);
      this.coordinates = data
    }
        
  );}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: new Leaflet.LatLng(23.8859, 45.0792, 14),
      zoom: 6,
      layers: getLayers(),
    });

  }

  drawCircles(coords:Coordinate[]): void {
    for (const c of coords) {
      const circle = Leaflet.circleMarker([c.loc[1],c.loc[0]], {color: 'red'});
      circle.addTo(this.map);
    }
  }

  drawPolygon(points: Leaflet.LatLng[]): void{
    Leaflet.polygon(points, {color: 'blue'}).addTo(this.map);
  }
}
export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};

