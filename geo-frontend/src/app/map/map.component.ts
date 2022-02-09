import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title = 'AngularOSM';

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 5,
    center: new Leaflet.LatLng(23.8859, 45.0792)
  };
  constructor() { }

  ngOnInit(): void {
  }

}
export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};