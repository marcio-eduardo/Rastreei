import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosComandosPageRoutingModule } from './meus-veiculos-comandos-routing.module';

import { MeusVeiculosComandosPage } from './meus-veiculos-comandos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosComandosPageRoutingModule
  ],
  declarations: [MeusVeiculosComandosPage]
})
export class MeusVeiculosComandosPageModule {}
