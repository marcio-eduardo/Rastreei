import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosUrlTempoPageRoutingModule } from './meus-veiculos-url-tempo-routing.module';

import { MeusVeiculosUrlTempoPage } from './meus-veiculos-url-tempo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosUrlTempoPageRoutingModule
  ],
  declarations: [MeusVeiculosUrlTempoPage]
})
export class MeusVeiculosUrlTempoPageModule {}
