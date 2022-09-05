import { AlertService } from './../../services/alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehicleLocalizationModel } from '../../models/vehicleLocalizationModel';
import { mock } from './../../shared/constants';

@Component({
  selector: 'app-meus-veiculos-comandos-velocidade',
  templateUrl: './meus-veiculos-comandos-velocidade.page.html',
  styleUrls: ['./meus-veiculos-comandos-velocidade.page.scss'],
})
export class MeusVeiculosComandosVelocidadePage implements OnInit {

  velocidade: number;
  listOfVelocidades = mock.lista_velocidade;
  @Input() vehicle: VehicleLocalizationModel;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertService
  ) {
    this.velocidade = null;
  }

  ngOnInit() {
  }

  Cancelar() {
    this.modalCtrl.dismiss();
  }

  Ok() {
    if (!this.velocidade) {
      this.alertCtrl.alert('Informação', 'Você deve informar qual velocidade irá ser enviada para o veículo!');
      return;
    } else {
      this.modalCtrl.dismiss(this.velocidade);
    }
  }

}
