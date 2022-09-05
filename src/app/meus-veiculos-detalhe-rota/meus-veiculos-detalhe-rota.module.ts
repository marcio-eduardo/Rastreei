import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheRotaPageRoutingModule } from './meus-veiculos-detalhe-rota-routing.module';

import { MeusVeiculosDetalheRotaPage } from './meus-veiculos-detalhe-rota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalheRotaPageRoutingModule
  ],
  declarations: [MeusVeiculosDetalheRotaPage]
})
export class MeusVeiculosDetalheRotaPageModule {}
