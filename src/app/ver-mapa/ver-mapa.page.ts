import { UserService } from "../../services/user.service";
import { SpinnerService } from "../../services/spinner.service";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ICoordinates } from "../../interfaces/ICoordinates";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  AfterContentInit,
  ElementRef,
} from "@angular/core";

import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { VehicleLocalizationModel } from "../../models/vehicleLocalizationModel";
import { IUserInfo } from "../../interfaces/IUserInfo";
//import { LatLngBounds } from "@capacitor/google-maps/dist/typings/definitions";

import { environment } from "../../environments/environment";
import {
  GoogleMap,
  MapType,
  Marker,
  //GoogleMaps,
  //GoogleMapsEvent,
  //GoogleMapOptions,
  //CameraPosition,
  //MarkerOptions,
  //Environment,
  //GoogleMapsMapTypeId, LatLngBounds
} from "@capacitor/google-maps";


//declare var google;

@Component({
  selector: "app-ver-mapa",
  templateUrl: "./ver-mapa.page.html",
  styleUrls: ["./ver-mapa.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VerMapaPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  apiKey = environment.googleKey;
  vehicles: Array<VehicleLocalizationModel> = new Array<VehicleLocalizationModel>();
  userInfo?: IUserInfo = null;

  center: any = {
    lat: -22.947288880673938,
    lng: -43.18793714046478,
  };
  markerId: string;
  
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private geoSrv: Geolocation,
    private spinnerSrv: SpinnerService,
    private userSrv: UserService
  ) {}

  //this.userInfo = this.userSrv.getUserData();

  ngOnInit() {
    this.userInfo = this.userSrv.getUserData();
    this.createMap();
  }

  ngAfterViewInit() {
    this.createMap();
  }
  
  //Cria o mapa através da API Google
  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: this.apiKey,           
        config: {

          center: this.center,
          zoom: 15,
        },       
      });

      // Move the map programmatically
      await this.newMap.setCamera({
        coordinate: {
          lat: this.center.lat,
          lng: this.center.lng,
          // lat: 28.782991, 
          // lng: 76.945626,
        },
        animate: true
      });

        // Enable marker clustering
      // await this.newMap.enableClustering();

        // Enable traffic Layer
      await this.newMap.enableTrafficLayer(true);

      await this.newMap.enableCurrentLocation(true);

      // await this.newMap.setPadding({
      //   top: 50,
      //   left: 50,
      //   right: 0,
      //   bottom: 0,
      // });

      // await this.newMap.setMapType(MapType.Satellite);
  
      this.addMarkers(this.center.lat, this.center.lng);
      this.addListeners();
    } catch(e) {
      console.log(e);
    }
  }

  //Adiciona marcadores no
  async addMarkers(lat, lng) {
    // Add a marker to the map
    // if(this.markerId) this.removeMarker();
    await this.newMap.addMarkers([
      {
        coordinate: {
          lat: lat,
          lng: lng,
        },
        // title: ,
        draggable: true
      },
      {
        coordinate: {
          lat: 28.782991, 
          lng: 76.945626,
        },
        // title: ,
        draggable: true
      },
    ]);
  }
  
  async addMarker(lat, lng) {
    // Add a marker to the map
    // if(this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      // title: ,
      draggable: true
    });
  }

  //Remove marcadores
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    // await this.newMap.setOnCameraMoveStartedListener((event) => {
    //   console.log(event);
    // });

    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log('setOnMyLocationButtonClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
  }

  async myPositionCenter() {

  }


  
}





/*Revisar todo o código
map
markers: any[] = []
vehicles: Array<VehicleLocalizationModel> =
  new Array<VehicleLocalizationModel>()
userInfo?: IUserInfo = null

constructor(
  private router: Router,
  private navCtrl: NavController,
  private geoSrv: Geolocation,
  private spinnerSrv: SpinnerService,
  private userSrv: UserService
) {}
    this.userInfo = this.userSrv.getUserData()
    this.initilizeMap()

    const { state } = this.router.getCurrentNavigation().extras
    if (!state) {
      this.navCtrl.navigateRoot('/meus-veiculos')
    } else {
      this.vehicles = state.vehicles
      this.vehicles.forEach(vehicle => {
        if (vehicle.latitude != null || vehicle.longitude != null)
          this.addMapMarker(
            { lat: vehicle.latitude, lng: vehicle.longitude },
            vehicle
          )
      })
      setTimeout(() => {
        this.zoomFitAllMarkers()
      }, 800)
    }
  }

  initilizeMap() {
    const point = { lat: -22.63768, lng: -43.194124 }
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: `${environment.googleKey}`,
      API_KEY_FOR_BROWSER_DEBUG: `${environment.googleKey}`
    })
    let mapOptions: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.ROADMAP,
      camera: {
        target: point,
        zoom: 17,
        tilt: 0
      },
      controls: {
        compass: true,
        // myLocationButton: true,
        indoorPicker: true,
        zoom: true,
        // zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER }
        preferences: {
          padding: {
            left: 10,
            top: 10,
            bottom: 10,
            right: 10
          },
          building: true
        }
      }
    }
    //    this.map = GoogleMaps.create('map1', mapOptions);
    // this.map = new google.maps.Map(document.getElementById('map1'), {
    //   center: point,
    //   zoom: 10,
    //   zoomControl: true,
    //   zoomControlOptions: {
    //     style: google.maps.ZoomControlStyle.DEFAULT,
    //     position: google.maps.ControlPosition.LEFT_TOP
    //   },
    //   disableDefaultUI: true,
    //   clickableIcons: false
    // });
  }

  addMapMarker(
    coord: ICoordinates,
    vehicle?: VehicleLocalizationModel,
    isMe: boolean = false
  ) {
    if (isMe) {
      this.map.setCenter(coord)
      this.map.setCameraZoom(12)
      setTimeout(() => {
        this.spinnerSrv.Hide()
      }, 500)
    } else {
      if (coord.lat != null && coord.lng != null) {
        const cIconMarker = {
          url: `../../assets/${isMe ? 'is-me' : 'icon-car-map'}.png`,
          size: {
            width: 50,
            height: 50
          }
          // size: new google.maps.Size(50, 50),
          // anchor: new google.maps.Point(-8, -80),
        }
        let marker: Marker = this.map.addMarkerSync({
          title: vehicle.nome,
          position: coord,
          icon: cIconMarker,
          animation: 'DROP'
        })

        this.markers.push(marker)

        //        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //          if (vehicle && vehicle.id_veiculo) {
        //            this.navCtrl.navigateForward('/meus-veiculos-detalhes', { state: { vehicle } });
        //          }
        //       });
      }
    }
    // if (isMe) {

    //   this.map.setCenter(coord);
    //   this.map.setZoom(12);
    //   setTimeout(() => {
    //     this.spinnerSrv.Hide();
    //   }, 500);
    // }
    // else {
    //   if (coord.lat != null && coord.lng != null) {
    //     const icon = {
    //       url: `../../assets/${isMe ? 'is-me' : 'icon-car-map'}.png`,
    //       scaledSize: new google.maps.Size(50, 50)
    //     };
    //     const maker = new google.maps.Marker({
    //       position: coord,
    //       map: this.map,
    //       animation: google.maps.Animation.DROP,
    //       icon
    //     });
    //     this.markers.push(maker);

    //     google.maps.event.addListener(maker, 'click', () => {
    //       if (vehicle && vehicle.id_veiculo) {
    //         this.navCtrl.navigateForward('/meus-veiculos-detalhes', { state: { vehicle } });
    //       }
    //     });
    //   }

    // }
  }

  zoomFitAllMarkers() {
    const latlngbounds: LatLngBounds = new LatLngBounds()
    this.vehicles.forEach(vehicle => {
      if (vehicle.latitude != null || vehicle.longitude != null) {
        latlngbounds.center //({ lat: vehicle.latitude, lng: vehicle.longitude })
      }
    })

    setTimeout(() => {
      // this.map.setCenter(latlngbounds.getCenter());
      // this.map.fitBounds(latlngbounds);
      // this.map.setZoom(this.map.getZoom());
      this.map.moveCamera({
        target: latlngbounds
      })
    }, 500)

    // const latlngbounds = new google.maps.LatLngBounds();
    // this.vehicles.forEach(vehicle => {
    //   if (vehicle.latitude != null || vehicle.longitude != null) {
    //     latlngbounds.extend({ lat: vehicle.latitude, lng: vehicle.longitude });
    //   }

    // });
    // setTimeout(() => {
    //   this.map.setCenter(latlngbounds.getCenter());
    //   this.map.fitBounds(latlngbounds);
    //   this.map.setZoom(this.map.getZoom());
    // }, 500);
  }

  async myPositionCenter() {
    this.spinnerSrv.Show('Aguarde...')
    const { coords } = await this.geoSrv.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
    // this.map.setCenter({ lat: coords.latitude, lng: coords.longitude });
    this.map.moveCamera({
      target: { lat: coords.latitude, lng: coords.longitude }
    })
    setTimeout(() => {
      this.spinnerSrv.Hide()
    }, 500)
    // this.addMapMarker({ lat: coords.latitude, lng: coords.longitude }, null, true);
  }

  clearAllMarkersInMap() {
    try {
      this.markers.forEach(el => {
        el.setMap(null)
      })
    } catch (error) {
      alert('Erro ao limpar os makers, motivo: ' + JSON.stringify(error))
    }
  }
}*/
