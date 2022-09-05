import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaTextoPageRoutingModule } from './meus-veiculos-detalhes-rota-texto-routing.module';

import { MeusVeiculosDetalhesRotaTextoPage } from './meus-veiculos-detalhes-rota-texto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalhesRotaTextoPageRoutingModule
  ],
  declarations: [MeusVeiculosDetalhesRotaTextoPage]
})
export class MeusVeiculosDetalhesRotaTextoPageModule {}
