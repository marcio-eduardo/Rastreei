import { DatahoraPipeModule } from './../../pipes/datahora/datahora.pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesPageRoutingModule } from './meus-veiculos-detalhes-routing.module';

import { MeusVeiculosDetalhesPage } from './meus-veiculos-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalhesPageRoutingModule, 
    DatahoraPipeModule
  ],
  declarations: [MeusVeiculosDetalhesPage]
})
export class MeusVeiculosDetalhesPageModule {}
