import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { faHeadset, faTools, faChartLine, faMoneyCheckAlt, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { UserService } from './../../services/user.service';
import { IParametros } from './../../interfaces/IParametros';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
	selector: 'app-ajuda',
	templateUrl: './ajuda.page.html',
	styleUrls: ['./ajuda.page.scss'],
})
export class AjudaPage implements OnInit {

	faHeadset = faHeadset;
	faTools = faTools;
	faChartLine = faChartLine;
	faMoneyCheckAlt = faMoneyCheckAlt;
	faBarcode = faBarcode;
	telAssitencia24Horas: IParametros = null;
	telCentralMonitoramento: IParametros = null;
	telManutencaoRastreador: IParametros = null;
	segundaViaBoleto: IParametros = null;

	constructor(
		private alertCtrl: AlertController,
		private callNumberSrv: CallNumber,
		private userSrv: UserService,
		private iab: InAppBrowser
	) { }

	ngOnInit() {
		let aAssitencia24Horas = this.userSrv.getUserParametros().filter(item => {
			return (item.parametro === 'app.tel.assistencia24h');
		});
		this.telAssitencia24Horas = (aAssitencia24Horas.length > 0) ? aAssitencia24Horas[0] : null;

		let aCentralMonitoramento = this.userSrv.getUserParametros().filter(item => {
			return (item.parametro === 'app.tel.monitoramento');
		});
		this.telCentralMonitoramento = (aCentralMonitoramento.length > 0) ? aCentralMonitoramento[0] : null;

		let aManutencaoRastreador = this.userSrv.getUserParametros().filter(item => {
			return (item.parametro === 'app.tel.rastreador');
		});
		this.telManutencaoRastreador = (aManutencaoRastreador.length > 0) ? aManutencaoRastreador[0] : null;

		let aSegundaViaBoleto = this.userSrv.getUserParametros().filter(item => {
			return (item.parametro === 'url.segundavia.boleto' && item.vl_parametro != '');
		});
		// this.segundaViaBoleto = {parametro: 'url.segundavia.boleto', vl_parametro: 'http://apache.org'} as IParametros;
		this.segundaViaBoleto = (aSegundaViaBoleto.length > 0) ? aSegundaViaBoleto[0] : null;
	}

	private clean_number(value: String): String {
		return String(value).replace(/[^0-9a-zA-Z]+/g, "");
	}

	async assitencia24Horas() {
		if (this.telAssitencia24Horas){
			(await this.alertCtrl.create({
				header: 'Assistência 24 horas.',
				message: 'Telefone para Contato: <br />' + this.telAssitencia24Horas.vl_parametro,
				buttons: [
					{ text: 'Fechar', handler: () => { } },
					{
						text: 'Ligar', handler: async () => {
							let vTelefone: String = this.clean_number(this.telAssitencia24Horas.vl_parametro);
							await this.call(vTelefone.toString());
						}
					}
				]
			})).present();
		}
	}

	async centralMonitoramento() {
		if (this.telCentralMonitoramento){
			(await this.alertCtrl.create({
				header: 'Central de Monitoramento.',
				message: 'Telefone para Contato: <br /> ' + this.telCentralMonitoramento.vl_parametro,
				buttons: [
					{ text: 'Fechar', handler: () => { } },
					{
						text: 'Ligar', handler: async () => {
							let vTelefone: String = this.clean_number(this.telCentralMonitoramento.vl_parametro);
							await this.call(vTelefone.toString());
						}
					}]
			})).present();
		}
	}

	async manutencaoRastreador() {
		if (this.telManutencaoRastreador) {
			(await this.alertCtrl.create({
				header: 'Manutenção do Rastreador.',
				message: 'Telefone para Contato: <br /> ' + this.telManutencaoRastreador.vl_parametro,
				buttons: [
					{ text: 'Fechar', handler: () => { } },
					{
						text: 'Ligar', handler: async () => {
							let vTelefone: String = this.clean_number(this.telManutencaoRastreador.vl_parametro);
							await this.call(vTelefone.toString());
						}
					}]
			})).present();
		}
	}

	async openSegundaViaBoleto() {
		if (this.segundaViaBoleto) {
			// const browser = this.iab.create(this.segundaViaBoleto.vl_parametro,  '_blank');
			let browser = new InAppBrowser().create(this.segundaViaBoleto.vl_parametro,  '_system');
			// var ref = window.open(this.segundaViaBoleto.vl_parametro, '_blank', 'location=yes');
			// ref.addEventListener('loadstart', function() { alert('open url'); });
		}
	}


	private async call(phone: string): Promise<void> {
		await this.callNumberSrv.callNumber(phone, true);
	}

}
