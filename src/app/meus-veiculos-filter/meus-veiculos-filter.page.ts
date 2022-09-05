import { mock } from './../../shared/constants';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meus-veiculos-filter',
  templateUrl: './meus-veiculos-filter.page.html',
  styleUrls: ['./meus-veiculos-filter.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeusVeiculosFilterPage implements OnInit {

  @Input() placa: string;
  @Input() id_tipo_veiculo: number;

  typesOfVehicles = mock.typeVehicle;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
  filtrar() {
    this.modalCtrl.dismiss({ placa: this.placa, id_tipo_veiculo: this.id_tipo_veiculo });
  }
}
