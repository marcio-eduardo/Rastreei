import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalhesRotaTipoPageRoutingModule } from './meus-veiculos-detalhes-rota-tipo-routing.module';

import { MeusVeiculosDetalhesRotaTipoPage } from './meus-veiculos-detalhes-rota-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalhesRotaTipoPageRoutingModule
  ],
  declarations: [MeusVeiculosDetalhesRotaTipoPage]
})
export class MeusVeiculosDetalhesRotaTipoPageModule {}
