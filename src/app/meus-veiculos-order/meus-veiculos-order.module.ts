import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosOrderPageRoutingModule } from './meus-veiculos-order-routing.module';

import { MeusVeiculosOrderPage } from './meus-veiculos-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosOrderPageRoutingModule
  ],
  declarations: [MeusVeiculosOrderPage]
})
export class MeusVeiculosOrderPageModule {}
