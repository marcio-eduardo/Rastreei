import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from './../../services/alert.service';

@Component({
	selector: 'app-meus-veiculos-detalhe-filtrar-data',
	templateUrl: './meus-veiculos-detalhe-filtrar-data.page.html',
	styleUrls: ['./meus-veiculos-detalhe-filtrar-data.page.scss'],
})
export class MeusVeiculosDetalheFiltrarDataPage implements OnInit {

	@Input() page: string;
	filter: any = {
		dt_inicial: moment().subtract(2, 'hour').toISOString(),//new Date().toISOString(),
		dt_final: moment().add(10, 'minutes').toISOString(),
	};

	constructor(
		private modalCtrl: ModalController,
		private alertSrv: AlertService,
	) {
		moment.locale('pt-br');
	}

	ngOnInit() {
	}

	cancelar() {
		this.modalCtrl.dismiss();
	}

	filtrar(pFiltro) {
		console.log(moment(this.filter.dt_inicial).isBefore(this.filter.dt_final));
		if (moment(this.filter.dt_inicial).isBefore(this.filter.dt_final) == false) {
			this.alertSrv.alert('Informação', 'Intervalo entre as datas inválida!');
		}
		else {
			let dados = { filtro: this.filter, page: this.page }
			// this.modalCtrl.dismiss({ ...this.filter, page: this.page });
			this.modalCtrl.dismiss(dados);
		}
	}

}
