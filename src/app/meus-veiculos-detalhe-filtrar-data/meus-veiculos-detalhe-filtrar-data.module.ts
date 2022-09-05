import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheFiltrarDataPageRoutingModule } from './meus-veiculos-detalhe-filtrar-data-routing.module';

import { MeusVeiculosDetalheFiltrarDataPage } from './meus-veiculos-detalhe-filtrar-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalheFiltrarDataPageRoutingModule
  ],
  declarations: [MeusVeiculosDetalheFiltrarDataPage]
})
export class MeusVeiculosDetalheFiltrarDataPageModule {}
