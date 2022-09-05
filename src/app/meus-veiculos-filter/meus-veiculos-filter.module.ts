import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosFilterPageRoutingModule } from './meus-veiculos-filter-routing.module';

import { MeusVeiculosFilterPage } from './meus-veiculos-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosFilterPageRoutingModule
  ],
  declarations: [MeusVeiculosFilterPage]
})
export class MeusVeiculosFilterPageModule {}
