import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { mock } from './../../shared/constants';

@Component({
  selector: 'app-meus-veiculos-url-tempo',
  templateUrl: './meus-veiculos-url-tempo.page.html',
  styleUrls: ['./meus-veiculos-url-tempo.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeusVeiculosUrlTempoPage implements OnInit {

  @Input() tempo_acesso: number;

  tempoURL = mock.tempo_url;

  constructor(private router: Router, private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
  confirmar() {
    this.modalCtrl.dismiss({ tempo_acesso: this.tempo_acesso });
  }

}
