import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICoordinates } from '../../interfaces/ICoordinates';
import { VehicleLocalizationModel } from '../../models/vehicleLocalizationModel';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import {
	//GoogleMaps,
	GoogleMap,
	//GoogleMapsEvent,
	//GoogleMapOptions,
	//CameraPosition,
	//MarkerOptions,
	Marker,
	//PolylineOptions,
	//GoogleMapsMapTypeId, LatLngBounds
  } from '@capacitor/google-maps';

declare var google;

@Component({
	selector: 'app-meus-veiculos-detalhes-rota-mapa',
	templateUrl: './meus-veiculos-detalhes-rota-mapa.page.html',
	styleUrls: ['./meus-veiculos-detalhes-rota-mapa.page.scss'],
  	encapsulation: ViewEncapsulation.None
})
export class MeusVeiculosDetalhesRotaMapaPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

/* verificar todo o código
	map;
	markers: any[] = [];
	vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();
	routes: any = [];
	filter: any = {};

	constructor(
		private router: Router,
		private navCtrl: NavController
	) {
		moment.locale('pt-BR');
	}

	ngOnInit() {

		this.initilizeMap();

		const { state } = this.router.getCurrentNavigation().extras;
		if (!state) {
			this.navCtrl.navigateRoot('/meus-veiculos');
		} else {
			this.vehicle = state.vehicle;
			this.routes = state.routes;
			this.filter = state.filter.filtro;

			setTimeout(() => {
				this.routes.forEach(item => {
					let dtLocalizacao = moment(item.dt_localizacao.S, "YYYY-MM-DD HH:mm:ss");
					this.addMapMarker({ lat: parseFloat(item.latitude.S), lng: parseFloat(item.longitude.S) }, dtLocalizacao.format('dddd, d [de] MMMM [de] YYYY, HH:mm:ss'));
				});
				this.zoomFitAllMarkers();
			}, 1000);
		}
	}

	// initilizeMap() {
	// 	const point = { lat: -34, lng: 151 };
	// 	this.map = new google.maps.Map(document.getElementById('mapVehicle'), {
	// 		center: point,
	// 		zoom: 15,
	// 		disableDefaultUI: true,
	// 	});
	// }

	initilizeMap() {
		const point = { lat: -34, lng: 151 };
		let mapOptions: GoogleMapOptions = {
			mapType: GoogleMapsMapTypeId.ROADMAP,
			camera: {
				target: point,
				zoom: 15,
				tilt: 0
			},
			controls: {
				compass: true,
				// myLocationButton: true,
				indoorPicker: true,
				zoom: false,
				preferences: {
					padding: {
					  left: 10,
					  top: 10,
					  bottom: 10,
					  right: 10
					},

					building: true
				  }
			},
			gestures: {
				scroll: true,
				tilt: false,
				zoom: true,
				rotate: true
			},
		};
		this.map = GoogleMaps.create('mapVehicle', mapOptions);
	}

	// addMapMarker(coord: ICoordinates, pDtLocalizacao: string) {
	// 	const infowindow = new google.maps.InfoWindow({
	// 		content: '<div id="content">' + pDtLocalizacao + '</div>'
	// 	});

	// 	const icon = {
	// 		url: `../../assets/is-me.png`,
	// 		scaledSize: new google.maps.Size(20, 20)
	// 	};
	// 	const marker = new google.maps.Marker({
	// 		position: coord,
	// 		map: this.map,
	// 		icon,
	// 		title: pDtLocalizacao
	// 	});
	// 	marker.addListener('click', function () {
	// 		infowindow.open(this.map, marker);
	// 	});

	// 	this.markers.push({ marker, coord });
	// }

	addMapMarker(coord: ICoordinates, pDtLocalizacao: string) {
		// const infowindow = new google.maps.InfoWindow({
		// 	content: '<div id="content">' + pDtLocalizacao + '</div>'
		// });
		const cIconMarker = {
			url: this.setIconMap(this.vehicle.tipo_veiculo), //'../../assets/icon-car-map.png',
			size: {
				width: 45,
				height: 41
			},
			anchor: [20, 15],
		};
		const marker: Marker = this.map.addMarkerSync({
			title: pDtLocalizacao,
			icon: cIconMarker,
			animation: 'DROP',
			position: coord
		});

		this.markers.push({ marker, coord });
	}

	setIcon(pTipoIcon: string) {
		let icon_name: string = "";
		switch (pTipoIcon) {
			case "MOTOS":
				icon_name = "/assets/icon_moto.png";
				break;

			case "CAMINHAO":
				icon_name = "/assets/icon_truck.png";
				break;

			default:
				icon_name = "/assets/icon_car.png";
				break;
		}

		return icon_name;
	}

	setIconMap(pTipoIcon: string) {
		let icon_name: string = "";
		switch (pTipoIcon) {
			case "MOTOS":
				icon_name = '../../assets/icon-moto-map.png';
				break;

			case "CAMINHAO":
				icon_name = '../../assets/icon-truck-map.png';
				break;

			default:
				icon_name = '../../assets/icon-car-map.png';
				break;
		}

		return icon_name;
	}


	// zoomFitAllMarkers() {
	// 	const latlngbounds = new google.maps.LatLngBounds();
	// 	this.markers.forEach(marker => {
	// 		latlngbounds.extend(marker.coord);
	// 	});
	// 	setTimeout(() => {
	// 		this.map.setCenter(latlngbounds.getCenter());
	// 		this.map.fitBounds(latlngbounds);
	// 		this.map.setZoom(this.map.getZoom() - 2);
	// 	}, 500);
	// 	this.drawPolyline();
	// }

	zoomFitAllMarkers() {
		const latlngbounds : LatLngBounds = new LatLngBounds();
		this.markers.forEach(marker => {
			latlngbounds.extend(marker.coord);
		});

		this.drawPolyline();
		setTimeout(() => {
			this.map.moveCamera({
				'target': latlngbounds
			});
		}, 100);

	}

	// drawPolyline() {
		// const polyLine = new google.maps.Polyline({
		// 	path: this.markers.map(m => m.coord),
		// 	geodesic: true,
		// 	strokeColor: '#78849E', // strokeColor.cssColor,
		// 	strokeOpacity: 1,
		// 	strokeWeight: 3,
		// 	map: this.map
		// });

		// let i = 0;
		// let prevLatLang: any = "";
		// this.routes.forEach(value => {
		// 	i++;
		// 	let curLatLang = new google.maps.LatLng(parseFloat(value.latitude.S), parseFloat(value.longitude.S));
		// 	if (prevLatLang == "") {
		// 		prevLatLang = curLatLang;
		// 	} else {
		// 		const strokeColor = this.makeGradientColor({ r: 40, g: 210, b: 35 }, { r: 232, g: 80, b: 40 }, ((i / this.routes.length) * 100));
		// 		var polyLine = new google.maps.Polyline({
		// 			path: [prevLatLang, curLatLang],
		// 			geodesic: true,
		// 			strokeColor: strokeColor.cssColor,
		// 			strokeOpacity: 1.0,
		// 			strokeWeight: 5
		// 		});
		// 		prevLatLang = curLatLang;
		// 		polyLine.setMap(this.map);
		// 	}
		// });
	// }

	drawPolyline() {
		// let polyLineOption: PolylineOptions =
		// {
		// 	points: this.markers.map(m => m.coord),
		// 	'color' : '#00008B',
		// 	'width': 4,
		// 	'geodesic': true,

		// }
		// this.map.addPolyline(polyLineOption); //.then((polyline: Polyline) => { });

		let i = 0;
		let prevLatLang: any = "";
		this.markers.forEach(value => {
			i++;
			let curLatLang = value.coord;
			if (prevLatLang == "") {
				prevLatLang = curLatLang;
			} else {
				const strokeColor = this.makeGradientColor({ r: 70, g: 163, b: 35 }, { r: 232, g: 80, b: 40 }, ((i / this.routes.length) * 100));
				let polyLineOption: PolylineOptions = {
					'points': [prevLatLang, curLatLang],
					'geodesic': true,
					'color': strokeColor.cssColor,
					'width': 4
				};
				prevLatLang = curLatLang;
				this.map.addPolyline(polyLineOption);
			}
		});
	}

	makeGradientColor(color1, color2, percent) {
		var newColor = { a: 0, r: 0, g: 0, b: 0, cssColor: '' };

		function makeChannel(a, b) {
			return (a + Math.round((b - a) * (percent / 100)));
		}
		function makeColorPiece(num) {
			num = Math.min(num, 255);   // not more than 255
			num = Math.max(num, 0);     // not less than 0
			var str = num.toString(16);
			if (str.length < 2) {
				str = "0" + str;
			}
			return (str);
		}
		newColor.r = makeChannel(color1.r, color2.r);
		newColor.g = makeChannel(color1.g, color2.g);
		newColor.b = makeChannel(color1.b, color2.b);
		newColor.a = percent;

		newColor.cssColor = "#" +
			makeColorPiece(newColor.r) +
			makeColorPiece(newColor.g) +
			makeColorPiece(newColor.b);
		return (newColor);
	}


}
*/
