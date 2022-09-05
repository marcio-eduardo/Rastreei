import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meus-veiculos-order',
  templateUrl: './meus-veiculos-order.page.html',
  styleUrls: ['./meus-veiculos-order.page.scss'],
})
export class MeusVeiculosOrderPage implements OnInit {
  @Input() order: string;


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (!this.order) { this.order = 'dt_desc'; }
  }
  confirmar() {
    this.modalCtrl.dismiss(this.order);
  }
}
