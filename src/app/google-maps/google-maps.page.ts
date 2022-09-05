
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {
  //GoogleMaps,
  GoogleMap,
  //GoogleMapsEvent,
  //GoogleMapOptions,
  //CameraPosition,
  //MarkerOptions,
  Marker,
  //environment
} from '@capacitor-community/google-maps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoogleMapsPage implements OnInit {
  map: GoogleMap;

  constructor() {}

  ngOnInit() {
    //this.loadMap();
  }

  /*loadMap() {
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
	}*/
}
