import { INotifications } from './../../interfaces/INotifications';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, Input } from '@angular/core';
import { VehicleLocalizationModel } from '../../models/vehicleLocalizationModel';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommandService } from './../../services/command.service';
import { rastreadorLoginNotificacaoModel } from '../../models/rastreadorLoginNotificacaoModel';

@Component({
	selector: 'app-meus-veiculos-detalhe-alertas',
	templateUrl: './meus-veiculos-detalhe-alertas.page.html',
	styleUrls: ['./meus-veiculos-detalhe-alertas.page.scss', '../content-alert-drawer/content-alert-drawer.scss'],
})
export class MeusVeiculosDetalheAlertasPage implements OnInit {

	list: INotifications[] = [];
	vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();
	drawerOptions: any;
	flg_ignicao: rastreadorLoginNotificacaoModel = new rastreadorLoginNotificacaoModel;
	flg_movimento: rastreadorLoginNotificacaoModel = new rastreadorLoginNotificacaoModel;
	vIgnicaoVerify: boolean = false; 
	vMovimentoVerify: boolean = false; 

	constructor(
		private router: Router,
		private navCtrl: NavController,
		private vehicleSrv: VehicleService,
		private commandSrv: CommandService
	) {

		this.drawerOptions = {
			handleHeight: 30,
			thresholdFromBottom: 200,
			thresholdFromTop: 200,
			bounceBack: true
		};
	}

	ngOnInit() {
		const { state } = this.router.getCurrentNavigation().extras;
		if (!state) {
			this.navCtrl.navigateRoot('/meus-veiculos');
		} else {
			this.vehicle = state.vehicle;
			this.loadAlerts();

			//VERIFICAR SE O RASTREADOR TEM ALERTA DE IGNICAO, MOVIMENTACAO CONFIGURADO NO SISTEMA
			this.alerta_notificacao_ignicao_verify();
			this.ignicao_login_notificacao();
			this.alerta_notificacao_movimento_verify();
			this.movimento_login_notificacao();

		}
	}

	async loadAlerts() {
		const { data } = await this.vehicleSrv.getAlerts(this.vehicle.id_rastreador);		
		this.list = data as INotifications[];
	}

	async alerta_notificacao_ignicao_verify() {
		const { data } = await this.commandSrv.get_rastreador_alerta_notificacao_verify(this.vehicle.id_rastreador, 11);
		if (data.length > 0) {
			console.log('Atualizar toogle de ignicao.');
			if (data[0].id_status == 1) {
				this.vIgnicaoVerify = false;
			}
			else {
				this.vIgnicaoVerify = true;
			}
		}
		else{
			this.vIgnicaoVerify = true;
		}
	}

	async ignicao_login_notificacao() {
		const { data } = await this.commandSrv.alerta_login_notificacao(this.vehicle.id_rastreador, 11);
		let vItems : Array<rastreadorLoginNotificacaoModel>  = data as Array<rastreadorLoginNotificacaoModel>;
		if (vItems.length > 0) {
			// this.flg_ignicao.id_status = vItems[0].id_status;
			this.flg_ignicao = vItems[0];
			this.flg_ignicao.IsDirty = (this.flg_ignicao.id_status == 0) ? true : false;
		}
		else {
			this.flg_ignicao.IsDirty = false;
		} 
	}

	async alerta_notificacao_movimento_verify() {
		const { data } = await this.commandSrv.get_rastreador_alerta_notificacao_verify(this.vehicle.id_rastreador, 3);
		if (data.length > 0) {
			console.log('Atualizar toogle de movimento.');
			if (data[0].id_status == 1) {
				this.vMovimentoVerify = false;
			}
			else {
				this.vMovimentoVerify = true;
			}
		}
		else{
			this.vMovimentoVerify = true;
		}
	}

	async movimento_login_notificacao() {
		const { data } = await this.commandSrv.alerta_login_notificacao(this.vehicle.id_rastreador, 3);
		let vItems : Array<rastreadorLoginNotificacaoModel>  = data as Array<rastreadorLoginNotificacaoModel>;
		if (vItems.length > 0) {
			this.flg_movimento = vItems[0];
			this.flg_movimento.IsDirty = (this.flg_movimento.id_status == 0) ? true : false;
		}
		else {
			this.flg_movimento.IsDirty = false;
		}
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

	async changeIgnicao($event){
		console.log('change ingnicao');
		// if (this.flg_ignicao.IsDirty && this.flg_ignicao.id_rastreador_login_notificacao == undefined) {
		if (this.flg_ignicao.id_rastreador_login_notificacao == undefined) {
			await this.commandSrv.insert_alerta_login_notificacao(this.vehicle.id_rastreador, 11, this.flg_ignicao.id_status);
			await this.commandSrv.insert_alerta_login_notificacao(this.vehicle.id_rastreador, 12, this.flg_ignicao.id_status);
			await this.ignicao_login_notificacao();
			// this.alertSrv.toast('Comando Velocidade enviado com sucesso!', 'bottom');
		}
		else if(this.flg_ignicao.IsDirty && this.flg_ignicao.id_rastreador_login_notificacao != undefined){
		// else if(this.flg_ignicao.id_rastreador_login_notificacao != undefined){
			console.log('Atualizar notificacao de ignicao.');
			await this.commandSrv.update_alerta_login_notificacao(this.vehicle.id_rastreador, 11, this.flg_ignicao.id_status);
			await this.commandSrv.update_alerta_login_notificacao(this.vehicle.id_rastreador, 12, this.flg_ignicao.id_status);			
		}
			
		this.flg_ignicao.IsDirty = true;
	}

	async changeMovimentacao($event){
		console.log('change movimento');
		if (this.flg_movimento.id_rastreador_login_notificacao == undefined) {
			await this.commandSrv.insert_alerta_login_notificacao(this.vehicle.id_rastreador, 3, this.flg_movimento.id_status);
			await this.movimento_login_notificacao();
		}
		else if(this.flg_movimento.IsDirty && this.flg_movimento.id_rastreador_login_notificacao != undefined){
			console.log('Atualizar notificacao de movimento.');
			await this.commandSrv.update_alerta_login_notificacao(this.vehicle.id_rastreador, 3, this.flg_movimento.id_status);			
		}
		this.flg_movimento.IsDirty = true;
	}
}
