import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { mock } from './../../shared/constants';

@Component({
  selector: 'app-meus-veiculos-comandos-movimento',
  templateUrl: './meus-veiculos-comandos-movimento.page.html',
  styleUrls: ['./meus-veiculos-comandos-movimento.page.scss'],
})
export class MeusVeiculosComandosMovimentoPage implements OnInit {

  movimento: string;
  listOfMovimentos = mock.lista_movimento;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertService
  ) {
    this.movimento = null;
  }

  ngOnInit() {
  }

  Cancelar() {
    this.modalCtrl.dismiss();
  }

  Ok() {
    if (!this.movimento) {
      this.alertCtrl.alert('Informação', 'Você deve selecionar uma opção.');
      return;
    } else {
      this.modalCtrl.dismiss(this.movimento);
    }
  }

}
