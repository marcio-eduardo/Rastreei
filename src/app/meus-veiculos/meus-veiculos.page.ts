import { QueryLocalizacaoModel } from './../../models/queryLocalizacaoModel';
import { MeusVeiculosOrderPage } from './../meus-veiculos-order/meus-veiculos-order.page';
import { MeusVeiculosFilterPage } from './../meus-veiculos-filter/meus-veiculos-filter.page';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { VehicleLocalizationModel } from './../../models/vehicleLocalizationModel';
import { VehicleService } from './../../services/vehicle.service';
import { UserService } from './../../services/user.service';
import { IUserInfo } from './../../interfaces/IUserInfo';
import { Component, OnInit } from '@angular/core';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, interval } from 'rxjs';
//import { interval } from 'rxjs';

//import 'rxjs/add/observable/interval';
//import 'rxjs/add/operator/mergeMapTo';
//import 'rxjs/add/operator/map';

import { SpinnerService } from '../../services/spinner.service';
import { storeKeys } from './../../shared/constants';
import { AlertService } from './../../services/alert.service';
import { AuthService } from "./../../services/auth.service";

@Component({
	selector: 'app-meus-veiculos',
	templateUrl: './meus-veiculos.page.html',
	styleUrls: ['./meus-veiculos.page.scss'],
})
export class MeusVeiculosPage implements OnInit {

	faSortAmountUp = faSortAmountUp;
	items: Array<VehicleLocalizationModel> = new Array<VehicleLocalizationModel>();
	listFilters: Array<VehicleLocalizationModel> = new Array<VehicleLocalizationModel>();
	list: Array<VehicleLocalizationModel> = new Array<VehicleLocalizationModel>();
	query: QueryLocalizacaoModel = new QueryLocalizacaoModel();
	searching: boolean = false;
	userInfo: IUserInfo;
	searchText: string = '';
	vTimerLoad: null;
	startIndex: number = 0;
	endIndex: number = 30;
	contItem: number = 0;
	numItemPage: number = 30;
	private vehicleSelected: VehicleLocalizationModel = null;
	private subscriptionInterval;

	constructor(
		private userSrv: UserService,
		private vehicleSrv: VehicleService,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private spinnerSrv: SpinnerService,
		private AuthService: AuthService
	) { }

	ngOnInit() {
		this.userInfo = this.userSrv.getUserData();
		this.loadMyVehicles();
		this.ObservableLoadMyData();
		this.vehicleSelected = null;
	}

	ionViewWillEnter() {
		this.vehicleSelected = null;
	}

	private ObservableLoadMyData() {
		try {
			this.subscriptionInterval = interval(55000).subscribe(() => {
				this.loadIntervalVehicles();
			},
				(error: any) => {
					console.log('error');
				},
				() => {
					console.log('observable completed !');
				}
			);

		} catch (error) {
			console.log('error', error);
		}
	}

	async loadIntervalVehicles() {
		try {
			await this.loadDados();
		} catch (error) {
			await this.spinnerSrv.Hide();
			console.log('error', error);
		}

	}

	async refrehVehicles(event) {
		try {
			await this.loadDados();
			event.target.complete();
		} catch (error) {
			await this.spinnerSrv.Hide();
			console.log('error', error);
		}

	}

	async loadMyVehicles() {
		try {
			// await this.spinnerSrv.Show();
			await this.loadDados()
			// await this.spinnerSrv.Hide();
		} catch (error) {
			await this.spinnerSrv.Hide();
			console.log('error', error);
		}

	}

	async loadDados() {
		try {
			const { data, error } = await this.vehicleSrv.getLocalizacao(this.query);//.catch(e => console.log('Error: ', e.message));
			this.listFilters = this.items = data[0] as Array<VehicleLocalizationModel>;
			if (error != undefined && (error.status === 401 || error.status === 403)) {
				//this.alertSrv.alert('Informação', 'Sessão finalizada');
				this.subscriptionInterval.unsubscribe();
				this.AuthService.logout();
				//this.logout();
			}
			else {
				if (this.searchText && this.searchText.trim() !== '') {
					this.searchingHandler();
				}
				else {
					this.loadItens();
				}
				await this.setVehicleSelected();
			}			
		}
		catch (err) {
			console.log('Error: ', err.message)
		}
	}

	async openFilter() {
		const modal = await this.modalCtrl.create({
			component: MeusVeiculosFilterPage,
			cssClass: 'meus-veiculos-filter-page',
			componentProps: {
				placa: this.query.placa,
				id_tipo_veiculo: this.query.id_tipo_veiculo
			}
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		this.query.placa = data.placa || '';
		this.query.id_tipo_veiculo = data.id_tipo_veiculo || '';
		await this.loadMyVehicles();
	}

	async openOrder() {
		const modal = await this.modalCtrl.create({
			component: MeusVeiculosOrderPage,
			cssClass: 'meus-veiculos-order-page',
			componentProps: { order: this.query.sort }
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		this.query.sort = data;
		await this.loadMyVehicles();
	}

	async setVehicleSelected() {
		if (this.vehicleSelected != null) {
			let selected = this.items.filter(item => {
				return (item.id_rastreador == this.vehicleSelected.id_rastreador && item.id_localizacao != this.vehicleSelected.id_localizacao); // 
			});
			if (selected.length == 1) {
				this.vehicleSrv.setSelected(selected[0]);
				this.vehicleSelected = selected[0];
			}
			//console.log(this.vehicleSelected);
		}
	}

	details(vehicle: VehicleLocalizationModel) {
		this.vehicleSelected = vehicle;
		this.navCtrl.navigateForward('/meus-veiculos-detalhes', { state: { vehicle } });
		// this.navCtrl.navigateForward('/google-maps', { state: { vehicle } });
		
	}

	searchingHandler() {
		if (this.searchText && this.searchText.trim() !== '') {
			this.listFilters = this.items.filter(item => {
				return (item.tipo_veiculo.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
					(item.placa.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
			});
			this.loadItens();
		} else {
			this.listFilters = this.items;
			this.loadItens();
		}
	}

	showInMap() {
		this.navCtrl.navigateForward('/ver-mapa', { state: { vehicles: this.items } });
	}

	loadItens() {
		this.startIndex = 0;
		//this.endIndex = this.numItemPage;
		this.endIndex = (this.listFilters.length < this.numItemPage) ? this.listFilters.length : this.numItemPage;
		this.list = [];
		for (let i = this.startIndex; i < this.endIndex; i++) {
			if (i < this.listFilters.length) {
				this.list.push(this.listFilters[i]);
				this.startIndex++;
			}
		}
		this.endIndex += this.numItemPage;
	}

	doInfinite(infiniteScroll) {

		setTimeout(() => {
			for (let i = this.startIndex; i < this.endIndex; i++) {
				if (i < this.listFilters.length) {
					this.list.push(this.listFilters[i]);
					this.startIndex++;
				}
			}
			this.endIndex += this.numItemPage;

			infiniteScroll.target.complete();
		}, 255);
	}

	setIcon(pTipoIcon: string) {
		let icon_name: string = "";
		switch (pTipoIcon) {
			case "MOTOS":
				icon_name = "/assets/icon-moto-white.png";
				break;
			
			case "CAMINHAO":
				icon_name = "/assets/icon-truck-white.png";				
				break;
		
			default:
				icon_name = "/assets/icon-car-white.png";
				break;
		}

		return icon_name;
	}
	// logout() {
	// 	localStorage.removeItem(storeKeys.token);
	// 	localStorage.removeItem(storeKeys.user);
	// 	this.subscriptionInterval.unsubscribe();
	// 	this.navCtrl.navigateRoot('login');
	// }
}
