import { storeKeys } from './../shared/constants';
import { UserService } from './../services/user.service';
import { IUserInfo } from './../interfaces/IUserInfo';
import { IParametros } from './../interfaces/IParametros'
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Subscription } from 'rxjs';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertService } from './../services/alert.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from "./../services/auth.service";
import { IUserTokenPush } from './../interfaces/IUserTokenPush';
import { environment } from '../environments/environment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { VehicleLocalizationModel } from './../models/vehicleLocalizationModel';
import { QueryLocalizacaoModel } from './../models/queryLocalizacaoModel';

//to android use cordova-plugin-fcm-with-dependecy-updated
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

////to ios use firebase-messaging
// import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
// import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';
import { SpinnerService } from './../services/spinner.service';
import { VehicleService } from './../services/vehicle.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	public appPages = [
		{ title: 'Meus Veículos', url: '/meus-veiculos', icon: 'ios-home' },
		{ title: 'Notificações', url: '/notificacoes', icon: 'notifications' },
		{ title: 'Trocar Senha', url: '/trocar-senha', icon: 'md-lock' },
		{ title: 'Ajuda', url: '/ajuda', icon: 'md-help-circle' },
	];

	userInfo?: IUserInfo = null;
	telContato: IParametros = { parametro: '', vl_parametro: '' };
	segundaViaBoleto: IParametros = null;
	subscription: Subscription;
	vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private userSrv: UserService,
		private navCtrl: NavController,
		private network: Network,
		private alertSrv: AlertService,
		private AuthService: AuthService,
		// private alertCtrl: AlertController
		private fcm: FCM, //ANDROID
		private spinnerSrv: SpinnerService,
		private vehicleSrv: VehicleService
	) {
		this.AuthService.authUser.subscribe(jwt => {
			if (!jwt) {
				//this.navCtrl.navigateRoot('login');
				this.logout();
			}
		});
		this.AuthService.checkLogin();

		this.subscription = this.userSrv.subjectParametros$.subscribe(message => {
			if (message.length > 0) {
				this.telContato = message.filter(item => {
					return (item.parametro === 'app.tel.contato');
				})[0];

				let aSegundaViaBoleto = message.filter(item => {
					return (item.parametro === 'url.segundavia.boleto' && item.vl_parametro != '');
				});
				this.segundaViaBoleto = (aSegundaViaBoleto.length > 0) ? aSegundaViaBoleto[0] : null;
			}
			else {
				this.telContato = { parametro: '', vl_parametro: '' } as IParametros;
				this.segundaViaBoleto = null;
			}
		});

		// watch network for a disconnection
		let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			// console.log('network was disconnected :-(');
			this.alertSrv.alert('Informação', 'Rede de dados perdida.');
		});
		this.initializeApp();
	}

	ngOnInit() {
		console.log('ngOnInit');
	}

	ngAfterViewInit() {
		console.log('ngAfterViewInit');
	}

	ionViewWillEnter() {
		console.log('ionViewWillEnter');
		this.carregarPametros();
	}

	ionViewDidLeave() {
		console.log('ionViewDidLeave');
	}

	menuOpened() {
		console.log('menuOpened');
		this.carregarPametros();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.userInfo = this.userSrv.getUserData();
			this.statusBar.styleDefault();
			this.statusBar.backgroundColorByHexString('#003399');
			this.splashScreen.hide();

			if (this.userInfo == null) this.logout();
			this.carregarPametros();

			if (this.platform.is('ios')) {
				console.log("try grant permission IOS");
				//FirebaseMessaging.requestPermission().then(success => {
				this.fcm.requestPushPermission().then(success => {
					console.log("grant permission - SUCCESS");
					return this.manageFirebasePushNotifications();
				}).catch(error => {
					console.log("grant permission - ERROR:", error);
				});
			} else {
				this.manageFirebasePushNotifications();
			}
		});
	}

	manageFirebasePushNotifications() {
		// IOS
		// FirebaseMessaging.getToken().then(token => {
		// 	console.log("Firebase token: " + token);
		// 	//GUARDAR TOKEN DO USUARIO NO BANCO
		// 	// if (this.userInfo != null) this.guardar_token_push(token);
		// 	localStorage.setItem("token_push", token);
		// 	this.guardar_token_push(token);

		// });

		// FirebaseMessaging.onMessage().subscribe(message => {
		// 	console.log('Notification data ->', message);
		// 	if (this.userInfo != null) {
		// 		if (this.platform.is('ios')) {
		// 			const { title, body } = message.aps.alert;

		// 			if (message.id_tipo_mensagem == '5') {
		// 				this.vehicle = JSON.parse(message.veiculo);
		// 				let vBodyMensagem: string = body + ' Deseja visualizar lista de alertas?'
		// 				this.alertSrv.confirm(title, vBodyMensagem, () => {
		// 					this.navCtrl.navigateForward('/meus-veiculos-detalhe-alertas', { state: { vehicle: this.vehicle } });
		// 				});
		// 			}
		// 			else {
		// 				this.alertSrv.alert(title, body);
		// 			}

		// 		}
		// 	}
		// });

		// FirebaseMessaging.onBackgroundMessage().subscribe(message => {
		// 	console.log('Recebido in background');
		// 	console.log(message);
		// });

		// FirebaseMessaging.onTokenRefresh().subscribe(() => {
		// 	console.log("token onTokenRefresh");
		// 	//GUARDAR TOKEN DO USUARIO NO BANCO
		// 	if (this.userInfo != null) {
		// 		FirebaseMessaging.getToken().then(token => {
		// 			console.log("Firebase token: " + token);
		// 			//GUARDAR TOKEN DO USUARIO NO BANCO
		// 			localStorage.setItem("token_push", token);
		// 			this.guardar_token_push(token);
		// 		});
		// 	}
		// });

		//ANDROID
		this.fcm.getToken().then(token => {
			console.log(token);

			localStorage.setItem("token_push", token);
			//GUARDAR TOKEN DO USUARIO NO BANCO
			if (this.userInfo != null) this.guardar_token_push(token);

		});

		this.fcm.onTokenRefresh().subscribe(token => {
			console.log("token received: ", token);
			console.log("userInfo: ", this.userInfo);

			localStorage.setItem("token_push", token);
			//GUARDAR TOKEN DO USUARIO NO BANCO
			if (this.userInfo != null) this.guardar_token_push(token);
		})

		this.fcm.onNotification().subscribe(message => {
			console.log(message);
			if(message.wasTapped){
				console.log('Recebido in background');

				// this.navCtrl.navigateForward('/notificacoes');
				let vQuery: QueryLocalizacaoModel = new QueryLocalizacaoModel();
				vQuery.id_veiculo = message.id_veiculo;
				this.vehicleSrv.getLocalizacao(vQuery).then(response => {
					if (response != null){
						let items: Array<VehicleLocalizationModel> = response.data[0];
						let vVeiculo: VehicleLocalizationModel = items.find(element => {
							return (element.id_rastreador == message.id_rastreador)
						});
						if (vVeiculo != null){
							this.navCtrl.navigateForward('/meus-veiculos-detalhe-alertas', { state: { vehicle: vVeiculo } });
						}
						else {
							this.navCtrl.navigateForward('/notificacoes');
						}
					}
					else {
						this.navCtrl.navigateForward('/notificacoes');
					}
				});
			}
		})
	}

	carregarPametros() {
		let aParametros = this.userSrv.getUserParametros();
		let aParametroContato = aParametros.filter(item => {
			return (item.parametro === 'app.tel.contato');
		});
		this.telContato = (aParametroContato.length > 0) ? aParametroContato[0] : { parametro: '', vl_parametro: '' } as IParametros;

		let aSegundaViaBoleto = aParametros.filter(item => {
			return (item.parametro === 'url.segundavia.boleto' && item.vl_parametro != '');
		});
		this.segundaViaBoleto = (aSegundaViaBoleto.length > 0) ? aSegundaViaBoleto[0] : null;
	}

	logout() {
		localStorage.removeItem(storeKeys.token);
		localStorage.removeItem(storeKeys.user);
		localStorage.removeItem(storeKeys.parametros);
		this.userInfo = null;
		this.navCtrl.navigateRoot('login');
	}

	guardar_token_push(pToken: string) {
		if (pToken != null) {
			let userTokenPush: IUserTokenPush = { token: null, app_key: null };
			userTokenPush.token = pToken;
			userTokenPush.app_key = environment.appKey;

			this.userSrv.postTokenPush(userTokenPush).then(res => {
				this.spinnerSrv.Hide();
				console.log('Token Updated in login');
			});
		}
	}

	async openSegundaViaBoleto() {
		if (this.segundaViaBoleto) {
			// const browser = this.iab.create(this.segundaViaBoleto.vl_parametro,  '_blank');
			let browser = new InAppBrowser().create(this.segundaViaBoleto.vl_parametro, '_system');
			// var ref = window.open(this.segundaViaBoleto.vl_parametro, '_blank', 'location=yes');
			// ref.addEventListener('loadstart', function() { alert('open url'); });
		}
	}

	// async showAlert(title, msg, task) {
	// 	const alert = await this.alertCtrl.create({
	// 	  header: title,
	// 	  subHeader: msg,
	// 	  buttons: [
	// 		{
	// 		  text: `Action: ${task}`,
	// 		  handler: () => {
	// 			// E.g: Navigate to a specific screen
	// 		  }
	// 		}
	// 	  ]
	// 	})
	// 	alert.present();
	// }
}
