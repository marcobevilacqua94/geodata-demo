import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Coordinate, CoordinateService } from 'src/services/coordinate.service';
declare const L: any; // --> Works
import 'leaflet-draw';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'geo-frontend';
  private map: L.Map;
  private lastName = "";
  coordinates: Coordinate[]= [];
  points: L.LatLng[] = [];
  circles: L.CircleMarker[]= [];
  polygon: L.Polygon;
  comuniList: String[];
  lastPolyRaw = "";
  titleControl = L.Control;
  constructor(private _coordinateService: CoordinateService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.points);
  }

  ngOnInit(): void {
  }

  getCoordinate(input: any) {
    this.points = [];
    this.lastName = input.name;
    this.deleteCommons();
    try{
      let tempPoints = input.polygon.substring(1, input.polygon.length-1).split("),(");
      tempPoints.forEach((element:string) => {
        this.points.push(new L.LatLng(Number(element.split(",")[0]),Number(element.split(",")[1])));
      });
      this.deletePolygon();
      this.drawPolygon(this.points);

      this._coordinateService.getCoordinates(input.name, input.polygon).subscribe((data) => {
        this.lastPolyRaw = input.polygon;
        this.setCommons(data);
        this.coordinates = data;
        this.titleControl.setContent("<h2 style='background: white'>Searching for:  " + input.name + "</h2>");
      })
    } catch  (error) {
      if(this.lastPolyRaw != ""){
        this._coordinateService.getCoordinates(input.name, this.lastPolyRaw).subscribe((data) => {
                        this.setCommons(data);
                        this.coordinates = data;
                      });
      }
      this.titleControl.setContent("<h2 style='background: white'>Searching for:  " + input.name + "</h2>");
    }


  }

  getCoordinateDraw(input: any) {
      let center = this.map.getCenter();
      let zoom = this.map.getZoom();
      this.deleteCommons();
      if(this.polygon != null){
        this.deletePolygon();
        }
      this.points = input;
      try{
        this.drawPolygon(this.points);
      } catch  (error) {}
      this._coordinateService.getCoordinates(this.lastName, input).subscribe((data) => {
        this.lastPolyRaw = input;
        this.setCommons(data);
        this.coordinates = data;
      });

      }

  ngAfterViewInit(): void {
    this.initMap(new L.LatLng(41.9028, 12.4964, 14), 6);
  }

  private initMap(pos: any, zoom: any): void {
      this.map = L.map('map', {
            center: pos,
            zoom: zoom,
            layers: getLayers(),
          });

    // Initialise the FeatureGroup to store editable layers
    var editableLayers = new L.FeatureGroup();

  L.drawLocal = {
        draw: {
          toolbar: {
            // #TODO: this should be reorganized where actions are nested in actions
            // ex: actions.undo  or actions.cancel
            buttons: {
              polyline: '- your text-',
              polygon: 'Poly',
              rectangle: '- your text-',
              circle: '- your text-',
              marker: '- your text-',
              circlemarker: '- your text-'
            }
          },
          handlers: {
            circle: {
              tooltip: {
                start: '- your text-'
              },
              radius: '- your text-'
            },
            circlemarker: {
              tooltip: {
                start: '- your text-.'
              }
            },
            marker: {
              tooltip: {
                start: '- your text-.'
              }
            },
            polygon: {
              tooltip: {
                start: '',
                cont: '',
                end: ''
              }
            },
            polyline: {
              error: '<strong>Error:</strong> shape edges cannot cross!',
              tooltip: {
                start: 'Click to start drawing line.',
                cont: 'Click to continue drawing line.',
                end: 'Click last point to finish line.'
              }
            },
            rectangle: {
              tooltip: {
                start: '- your text-.'
              }
            },
            simpleshape: {
              tooltip: {
                end: 'Release mouse to finish drawing.'
              }
            }
          }
        },
        edit: {
          toolbar: {
            actions: {
              save: {
                title: 'Save changes',
                text: 'Save'
              },
              cancel: {
                title: 'Cancel editing, discards all changes',
                text: 'Cancel'
              },
              clearAll: {
                title: 'Clear all layers',
                text: 'Clear All'
              }
            },
            buttons: {
              edit: 'Edit layers',
              editDisabled: 'No layers to edit',
              remove: 'Delete layers',
              removeDisabled: 'No layers to delete'
            }
          },
          handlers: {
            edit: {
              tooltip: {
                text: 'Drag handles or markers to edit features.',
                subtext: 'Click cancel to undo changes.'
              }
            },
            remove: {
              tooltip: {
                text: 'Click on a feature to remove.'
              }
            }
          }
        }
      };

    var drawPluginOptions = {
        position: 'topleft',
        draw: {
            polygon: {
                shapeOptions: {
                    color: '#c700ac',
                    weight: 4
                }
            },
            polyline: false,
            circle: false,
            rectangle: false,
            circlemarker: false,
            marker: false
        },
        edit: {
            featureGroup: editableLayers,
            remove: false,
            edit: false
        }
    };
    var drawControl = new L.Control.Draw(drawPluginOptions);

    this.map.addControl(drawControl);
    this.map.addLayer(editableLayers);

    var MyCustomControl = L.Control.extend({
        options: {
            // Default control position
            position: 'bottomleft'
        },
        onAdd: function () {
            // Create a container with classname and return it
            return L.DomUtil.create('div', 'my-custom-control');
        },
        setContent: function (content: string) {
            // Set the innerHTML of the container
            this.getContainer().innerHTML = content;
        }
    });

    // Assign to a variable so you can use it later and add it to your map
    var myCustomControl =  new MyCustomControl().addTo(this.map);
    this.titleControl= myCustomControl;
    this.titleControl.setContent("<h2 style='background: white'>No Search Set</h2>");
    this.map.on('draw:created', (event) => {
      var points = event.layer.getLatLngs();
      this.getCoordinateDraw(points);
    });

  }

  setCommons(commons:Coordinate[]): void {
    for (const c of commons) {
      const circle = L.circleMarker([c.loc[1],c.loc[0]], {color: 'red', title: c.name});
      circle.addTo(this.map).bindPopup(c.name + " " + c.loc[0].toFixed(6) + "° N, " + c.loc[1].toFixed(6)+ "° E", {closeButton: false});
      circle.on('mouseover',function() {
        circle.openPopup();
      });
      circle.on('mouseout',function() {
        circle.closePopup();
      });
      this.circles.push(circle);
      this.comuniList.push(c.name);
    }
    this.comuniList.sort();
    document.getElementById("result")!.textContent = this.comuniList.join(", ");
  }

  deleteCommons(){
    for(let i=0;i<this.circles.length;i++){
      this.map.removeLayer(this.circles[i]);
    }
    this.circles = [];
    this.comuniList = [];
    document.getElementById("result")!.textContent = "";
  }

  drawPolygon(points: L.LatLng[]): void{
    const polygon = L.polygon(points, {color: 'blue'});
    this.polygon = polygon;
    this.polygon.bindPopup(this.polygon.getLatLngs().toString().replace(/[A-Za-z]*/g, "").replace(/, /g, "° N, ").replace(/\)/g,"° E)"), {closeButton: false});
    this.polygon.on('mouseclick',function() {
      polygon.openPopup();
    });
    this.polygon.on('mouseout',function() {
      polygon.closePopup();
    });
    this.polygon.addTo(this.map);
  }

  deletePolygon(){
    this.map.removeLayer(this.polygon);
  }


}
export const getLayers = (): L.Layer[] => {
  return [
    new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as L.TileLayerOptions),
  ] as L.Layer[];
};

