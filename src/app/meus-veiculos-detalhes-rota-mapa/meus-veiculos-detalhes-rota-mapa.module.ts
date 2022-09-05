import { DatahoraPipeModule } from './../../pipes/datahora/datahora.pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaMapaPageRoutingModule } from './meus-veiculos-detalhes-rota-mapa-routing.module';

import { MeusVeiculosDetalhesRotaMapaPage } from './meus-veiculos-detalhes-rota-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatahoraPipeModule,
    MeusVeiculosDetalhesRotaMapaPageRoutingModule
  ],
  declarations: [MeusVeiculosDetalhesRotaMapaPage]
})
export class MeusVeiculosDetalhesRotaMapaPageModule {}
