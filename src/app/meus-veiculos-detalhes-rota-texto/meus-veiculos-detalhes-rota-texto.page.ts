import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehicleLocalizationModel } from './../../models/vehicleLocalizationModel';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-meus-veiculos-detalhes-rota-texto',
  templateUrl: './meus-veiculos-detalhes-rota-texto.page.html',
  styleUrls: ['./meus-veiculos-detalhes-rota-texto.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeusVeiculosDetalhesRotaTextoPage implements OnInit {

  vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();
  routes: any = [];
  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const { state } = this.router.getCurrentNavigation().extras;
    if (!state) {
      this.navCtrl.navigateRoot('/meus-veiculos');
    } else {
      this.vehicle = state.vehicle;
      this.routes = this.group(state.routes, (r) => {
        return moment(r.dt_localizacao.S).format('DD/MM/YYYY - HH:mm:ss');
      });
    }
  }

  private group(array: any[], f: any) {
    const groups = {};
    array.forEach((o) => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map((group) => {
      return {
        key: group.replace(new RegExp('"', 'g'), ''),
        data: groups[group]
      };
    });
  }

}
