import { AlertService } from './../../services/alert.service';
import { CommandService } from './../../services/command.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VehicleLocalizationModel } from '../../models/vehicleLocalizationModel';
import { commandModel } from '../../models/commandModel';
import { MeusVeiculosComandosVelocidadePage } from './../meus-veiculos-comandos-velocidade/meus-veiculos-comandos-velocidade.page';
import { MeusVeiculosComandosMovimentoPage } from './../meus-veiculos-comandos-movimento/meus-veiculos-comandos-movimento.page';

@Component({
	selector: 'app-meus-veiculos-comandos',
	templateUrl: './meus-veiculos-comandos.page.html',
	styleUrls: ['./meus-veiculos-comandos.page.scss'],
})
export class MeusVeiculosComandosPage implements OnInit {

	@Input() vehicle: VehicleLocalizationModel;
	vSpeedVerify = false;
	vMovimentVerify = false;
	vLockVerify = false;

	constructor(
		private modalCtrl: ModalController,
		private commandSrv: CommandService,
		private alertSrv: AlertService
	) { }

	ngOnInit() {
		//VERIFICAR SE EXISTE COMANDO CADASTRADO PARA O RASTREADOR
		this.lock_verify();
		this.speed_verify();
		this.moviment_verify();
	}

	Ok() {
		this.modalCtrl.dismiss();
	}

	async speed_verify() {
		const { data } = await this.commandSrv.speed_verify(this.vehicle.id_rastreador);
		let vItems : Array<commandModel>  = data as Array<commandModel>;
		if (vItems.length > 0) {
			this.vSpeedVerify = (vItems[0].flg_ativo.data[0] === 1);
		}
	}

	async moviment_verify() {
		const { data } = await this.commandSrv.moviment_verify(this.vehicle.id_rastreador);
		let vItems : Array<commandModel>  = data as Array<commandModel>;
		if (vItems.length > 0) {
			this.vMovimentVerify = (vItems[0].flg_ativo.data[0] === 1);
		}
		// this.vMovimentVerify  = true;
	}

	async lock_verify() {
		const { data } = await this.commandSrv.lock_verify(this.vehicle.id_rastreador);
		let vItems : Array<commandModel>  = data as Array<commandModel>;
		if (vItems.length > 0) {
			this.vLockVerify = (vItems[0].flg_ativo.data[0] === 1);
		}
	}

	async commandMoviment(pCodigo: string) {
		await this.commandSrv.moviment(this.vehicle.id_rastreador, pCodigo);
		this.alertSrv.toast('Comando Movimento enviado com sucesso!', 'bottom');
	}
	async commandSpeed(speed: number) {
		await this.commandSrv.speed(speed, this.vehicle.id_rastreador);
		this.alertSrv.toast('Comando Velocidade enviado com sucesso!', 'bottom');
	}
	async commandLock() {
		await this.commandSrv.lock(this.vehicle.id_rastreador);
		this.alertSrv.toast('Comando Bloqueio enviado com sucesso!', 'bottom');
	}
	async commandUnlock() {
		await this.commandSrv.unlock(this.vehicle.id_rastreador);
		this.alertSrv.toast('Comando Desbloqueio enviado com sucesso!', 'bottom');
	}

	async openSpeed() {
		this.modalCtrl.dismiss();
		const modal = await this.modalCtrl.create({
			component: MeusVeiculosComandosVelocidadePage,
			cssClass: 'meus-veiculos-comandos-velocidade-page',
			componentProps: { vehicle: this.vehicle }
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		if (data > 0 && !isNaN(data)) {
			this.commandSpeed(data);
		}
		if (data && isNaN(data)) {
			this.alertSrv.alert('Informação', `A velocidade ${data} informada não é um número válido!`);
		}
	}

	async openMoviment() {
		this.modalCtrl.dismiss();
		const modal = await this.modalCtrl.create({
			component: MeusVeiculosComandosMovimentoPage,
			cssClass: 'meus-veiculos-comandos-movimento-page',
			//componentProps: { vehicle: this.vehicle }
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		if (data.length > 0 && !isNaN(data)) {
			this.commandMoviment(data);
		}
		if (data && isNaN(data)) {
			this.alertSrv.alert('Informação', `A velocidade ${data} informada não é um número válido!`);
		}
	}

}
