import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosComandosMovimentoPageRoutingModule } from './meus-veiculos-comandos-movimento-routing.module';

import { MeusVeiculosComandosMovimentoPage } from './meus-veiculos-comandos-movimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosComandosMovimentoPageRoutingModule
  ],
  declarations: [MeusVeiculosComandosMovimentoPage]
})
export class MeusVeiculosComandosMovimentoPageModule {}
