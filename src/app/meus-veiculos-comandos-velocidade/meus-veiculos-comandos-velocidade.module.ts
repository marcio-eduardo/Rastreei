import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosComandosVelocidadePageRoutingModule } from './meus-veiculos-comandos-velocidade-routing.module';

import { MeusVeiculosComandosVelocidadePage } from './meus-veiculos-comandos-velocidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosComandosVelocidadePageRoutingModule
  ],
  declarations: [MeusVeiculosComandosVelocidadePage]
})
export class MeusVeiculosComandosVelocidadePageModule {}
