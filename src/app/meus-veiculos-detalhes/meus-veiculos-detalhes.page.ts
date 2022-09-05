import { AlertService } from './../../services/alert.service';
import { VehicleService } from './../../services/vehicle.service';
import { UserService } from './../../services/user.service';
import { IUserInfo } from './../../interfaces/IUserInfo';
import { VehicleLocalizationModel } from './../../models/vehicleLocalizationModel';
import { MeusVeiculosComandosPage } from './../meus-veiculos-comandos/meus-veiculos-comandos.page';
import { MeusVeiculosUrlTempoPage } from './../meus-veiculos-url-tempo/meus-veiculos-url-tempo.page';
import { NavController, ModalController, Platform, ActionSheetController } from '@ionic/angular';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MeusVeiculosDetalheFiltrarDataPage } from '../meus-veiculos-detalhe-filtrar-data/meus-veiculos-detalhe-filtrar-data.page';
import { LaunchNavigator, LaunchNavigatorOptions, AppSelectionOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { QueryGenerateURLModel } from 'src/models/queryGenerateURLModel';
import { environment } from './../../environments/environment';
import { Clipboard } from '@awesome-cordova-plugins/clipboard';
import {
	//GoogleMaps,
	GoogleMap,
	//GoogleMapsEvent,
	//GoogleMapOptions,
	//CameraPosition,
	//MarkerOptions,
	Marker,
	//Environment,
	//GoogleMapsMapTypeId,
  //GoogleMapPreferenceOptions
} from '@capacitor/google-maps';

declare var google;
declare var plugin;
declare var cordova: any;

@Component({
	selector: 'app-meus-veiculos-detalhes',
	templateUrl: './meus-veiculos-detalhes.page.html',
	styleUrls: ['./meus-veiculos-detalhes.page.scss'],
	encapsulation: ViewEncapsulation.None
})

export class MeusVeiculosDetalhesPage{}

 /*export class MeusVeiculosDetalhesPage implements OnInit, OnDestroy, AfterViewInit {

	vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();
	map: GoogleMap;
	initialMapLoad: boolean = true;
	markers: Array<any> = [];
	subscription: Subscription;
	start = { lat: -34.397, lng: 150.644 };
	userInfo: IUserInfo;

	constructor(
		private router: Router,
		private navCtrl: NavController,
		private modalCtrl: ModalController,
		private vehicleSrv: VehicleService,
		private alertSrv: AlertService,
		private launchNavigator: LaunchNavigator,
		private userSrv: UserService,
		private platform: Platform,
		public actionSheetController: ActionSheetController
	) {
		moment.locale('pt-BR');
		this.subscription = this.vehicleSrv.subjectSelected$.subscribe(message => {
			if (message) {
				// console.log(message);
				this.vehicle = message;
				this.popupateMap();
			}
		});
		platform.ready().then(() => {
			console.log('Width: ' + platform.width());
			// console.log('Height: ' + platform.height());
		});
	}

	ngOnInit() {
		this.userInfo = this.userSrv.getUserData();
		const { state } = this.router.getCurrentNavigation().extras;
		if (!state) {
			this.navCtrl.navigateRoot('/meus-veiculos');
		} else {
			this.vehicle = state.vehicle;
			// this.popupateMap();
		}
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	}

	ngAfterViewInit() {
		this.popupateMap();
	}

	clearMarkers = () => {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
	}

	popupateMap() {
		if (this.vehicle.latitude != undefined) {
			const point = { lat: this.vehicle.latitude, lng: this.vehicle.longitude };

			if (this.vehicle.endereco === "0") {
				this.vehicleSrv.getAddress(this.vehicle.id_localizacao, this.vehicle.dt_localizacao, this.vehicle.latitude.toString(), this.vehicle.longitude.toString())
					.then(res => {
						this.vehicle.endereco = res.data;
					});
			}

			// // This code is necessary for browser
			// Environment.setEnv({
			// 	'API_KEY_FOR_BROWSER_RELEASE': `${environment.iosGoogleMapKey}`,
			// 	'API_KEY_FOR_BROWSER_DEBUG': `${environment.iosGoogleMapKey}`
			// });
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
				},
			};
			this.map = GoogleMaps.create('map', mapOptions);

			const cIconMarker = {
				url: '../../assets/icon-car-map.png',
				size: {
					width: 45,
					height: 41
				},
				anchor: [20, 15],
			};
			let marker: Marker = this.map.addMarkerSync({
				title: this.vehicle.nome,
				icon: cIconMarker,
				animation: 'DROP',
				position: point
			});

			// let marker: Marker = this.map.addMarkerSync({
			// 	title: 'Ionic',
			// 	icon: cIconMarker,
			// 	animation: 'DROP',
			// 	position: point
			// 	// position: {
			// 	// 	lat: 43.0741904,
			// 	// 	lng: -89.3809802
			// 	// }
			// });
			// marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
			// 	alert('clicked');
			// });

			// // plugin.google.maps.environment.setEnv({
			// // 	'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDt8xj0FliU1lS224e2Vv5h4trzMXvOkqI'
			// // });
			// this.map = plugin.google.maps.Map.getMap(document.getElementById('map'), {
			// 	// center: point,//this.start,

			// 	// zoom: 14,
			// 	// disableDefaultUI: true,
			// 	// clickableIcons: false
			// });


			// }

			// this.clearMarkers();

			// setTimeout(() => {
			// 	this.map.setCameraZoom(this.map.getCameraZoom() + 1);
			// 	this.map.setCameraTarget(point);
			// 	// const icon = {
			// 	// 	url: '../../assets/icon-car-map.png',
			// 	// 	size: new google.maps.Size(50, 50),
			// 	// 	anchor: new google.maps.Point(-8, -80),
			// 	// };
			// 	const maker = this.map.addMarker({
			// 		position: point,
			// 		map: this.map,
			// 		icon: {
			// 			'url': '../../assets/icon-car-map.png',
			// 			'anchor': new google.maps.Point(30, 30),
			// 			size: new google.maps.Size(56, 52),
			// 		}
			// 	});
			// 	this.markers.push(maker);

			// 	// const maker2 = new google.maps.Marker({
			// 	// 	position: point,
			// 	// 	map: this.map,
			// 	// 	'icon': {
			// 	// 		'url': '../../assets/icon-car-map.png',
			// 	// 		'anchor': [10, 20]
			// 	// 	}
			// 	// });
			// 	// this.markers.push(maker2);
			// }, 1000);
		}
	}

	moveMapToLocation(target: { lat: number, lng: number }) {
		let animateOpt = {
			target: target,
			zoom: 18,
			duration: 1000
		};

		this.map.animateCamera(animateOpt);
	}

	async openComands() {
		if (this.userInfo.flg_enviar_cmd == 1) {
			const modal = await this.modalCtrl.create({
				component: MeusVeiculosComandosPage,
				cssClass: 'meus-veiculos-comandos-page',
				componentProps: { vehicle: this.vehicle }
			});
			await modal.present();
		}
		else {
			this.alertSrv.alert('Informação', 'Usuário não possui permissão!');
		}

	}

	async openFilterDate(page: string) {
		const modal = await this.modalCtrl.create({
			component: MeusVeiculosDetalheFiltrarDataPage,
			cssClass: 'meus-veiculos-detalhe-filtrar-data',
			componentProps: { page }
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();



		if (data && data.filtro.dt_inicial && data.filtro.dt_final) {
			let vDtInicial = new Date(data.filtro.dt_inicial);
			let vDtFinal = new Date(data.filtro.dt_final);
			let request = {
				id_rastreador: this.vehicle.id_rastreador,
				dt_inicial: moment(vDtInicial).format("YYYY-MM-DD HH:mm:ss"),
				dt_final: moment(vDtFinal).format("YYYY-MM-DD HH:mm:ss")
			}
			const { data: routesData } = await this.vehicleSrv.getRoute(request);
			if (routesData.Count > 0) {
				if (page === 'text') {
					this.navCtrl.navigateForward('/meus-veiculos-detalhes-rota-texto',
						{ state: { vehicle: this.vehicle, routes: routesData.Items, filter: { ...data } } });
				} else {
					this.navCtrl.navigateForward('/meus-veiculos-detalhes-rota-mapa',
						{ state: { vehicle: this.vehicle, routes: routesData.Items, filter: { ...data } } });
				}
			} else {
				this.alertSrv.alert('Informação', 'Consulta não retornou dados!');
			}
		}
	}

	async openMaps() {
		// this.alertSrv.alert('Informação', 'Tentativa de abrir navegador!');
		let optionsSelection : AppSelectionOptions = {
			dialogHeaderText: "Selecione um app para navegação",
			cancelButtonText: "Cancelar"
		}

		let options: LaunchNavigatorOptions = {
			start: "",
			appSelection: optionsSelection
		};

		await this.launchNavigator.navigate([this.vehicle.latitude, this.vehicle.longitude], options)
			.then(
				// success => console.log('Launched navigator'),
				error => {
					console.log('Error launching navigator', error)
					this.alertSrv.alert('Informação', 'Erro abrindo navegador!');
				}
			);
	}

	openAlerts() {
		this.navCtrl.navigateForward('/meus-veiculos-detalhe-alertas', { state: { vehicle: this.vehicle } });
	}

	async openGenerateUrl() {
		if (this.userInfo.flg_gerar_link == 1) {
			this.navCtrl.navigateForward('/meus-veiculos-url', { state: { vehicle: this.vehicle } });
		}
		else {
			this.alertSrv.alert('Informação', 'Usuário não possui permissão!');
		}
		return;

		const modal = await this.modalCtrl.create({
			component: MeusVeiculosUrlTempoPage,
			cssClass: 'meus-veiculos-url-tempo-page',
			componentProps: { vehicle: this.vehicle }
		});
		await modal.present();
		const { data: dataTempoAcesso } = await modal.onWillDismiss();

		if (dataTempoAcesso != undefined) {
			let query = new QueryGenerateURLModel();
			query.id_veiculo = this.vehicle.id_veiculo;
			query.placa = null;//this.vehicle.placa;
			query.tempo_acesso = dataTempoAcesso.tempo_acesso;
			query.flg_desabilitar_login = 0;

			const { data: dataLinkExterno } = await this.vehicleSrv.postGerarLinkExterno(query);
			if (dataLinkExterno) {
				let vURL = `${environment.url_api}` + '/link_mapa/' + dataLinkExterno.result;
				this.platform.ready().then(() => {
					cordova.plugins.clipboard.copy(vURL);
				});

				// this.clipboard.copy(vURL);
				console.log(dataLinkExterno);
				this.alertSrv.alert('Informação', 'URL copiada para área de transferência!');
			}
			else {
				this.alertSrv.alert('Informação', 'Não foi possivel gerar URL!');
			}
		}

	}

	async openTipoHistorico() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Histórico',
			buttons: [{
				text: 'Texto',
				// cssClass: "icon_route_text",
				// icon: './../../assets/icon-route-text.png',
				handler: () => {
					// console.log('Delete clicked');
					this.openFilterDate('text');
				}
			}, {
				text: 'Mapa',
				// cssClass: "icon_route_map",
				// icon: '../../assets/icon-route-map.png',
				handler: () => {
					// console.log('Share clicked');
					this.openFilterDate('map');
				}
			}, {
				text: 'Cancelar',
				icon: 'close',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		});
		await actionSheet.present();
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
}
*/
