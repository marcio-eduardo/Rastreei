import { DatahoraPipeModule } from './../../pipes/datahora/datahora.pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosPageRoutingModule } from './meus-veiculos-routing.module';

import { MeusVeiculosPage } from './meus-veiculos.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosPageRoutingModule,
    FontAwesomeModule, 
    DatahoraPipeModule
  ],
  declarations: [MeusVeiculosPage]
})
export class MeusVeiculosPageModule {}
