import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosUrlPageRoutingModule } from './meus-veiculos-url-routing.module';

import { MeusVeiculosUrlPage } from './meus-veiculos-url.page';
import { DatahoraPipeModule } from './../../pipes/datahora/datahora.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosUrlPageRoutingModule,
    DatahoraPipeModule
  ],
  declarations: [MeusVeiculosUrlPage]
})
export class MeusVeiculosUrlPageModule {}
