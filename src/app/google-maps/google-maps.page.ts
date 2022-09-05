
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment';

/* Import do cordova. Precisa ser revisado
import {
	GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  //CameraPosition,
  //MarkerOptions,
  Marker,
  //environment
} from '@capacitor/google-maps';*/
import { GoogleMap } from '@capacitor/google-maps';
import { EnvironmentInjector } from '@ionic/angular/di/r3_injector';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoogleMapsPage implements OnInit {
	apiKey = environment.appKey;
	mapRef = document.getElementById('map');
		
  	map: GoogleMap;
	
	async loadMap() {
		const newMap = await GoogleMap.create({
		id: 'my-map', // Unique identifier for this map instance
		element: this.mapRef, // reference to the capacitor-google-map element
		apiKey: this.apiKey, // Your Google Maps API Key
		config: {
			center: {
			// The initial position to be rendered by the map
			lat: 33.6,
			lng: -117.9,
			},
			zoom: 8, // The initial zoom level to be rendered by the map
		},
		});

	}

  	constructor() { }

  	ngOnInit() {
    	this.loadMap();
  	}

}	  


/*Revisar código (cordova)
  loadMap() {
		Environment.setEnv({
			'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDt8xj0FliU1lS224e2Vv5h4trzMXvOkqI',
			'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDt8xj0FliU1lS224e2Vv5h4trzMXvOkqI'
		});
		let mapOptions: GoogleMapOptions = {
			camera: {
				target: {
					lat: 43.0741904,
					lng: -89.3809802
				},
				zoom: 18,
				tilt: 30
			}
		};
		this.map = GoogleMaps.create('map', mapOptions);

		let marker: Marker = this.map.addMarkerSync({
			title: 'Ionic',
			icon: 'blue',
			animation: 'DROP',
			position: {
				lat: 43.0741904,
				lng: -89.3809802
			}
		});
		marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
			alert('clicked');
		});
	}
}
*/
