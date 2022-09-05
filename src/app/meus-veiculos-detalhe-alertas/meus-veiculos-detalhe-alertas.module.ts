import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusVeiculosDetalheAlertasPageRoutingModule } from './meus-veiculos-detalhe-alertas-routing.module';

import { MeusVeiculosDetalheAlertasPage } from './meus-veiculos-detalhe-alertas.page';
import { ContentAlertDrawer } from '../content-alert-drawer/content-alert-drawer';
import { DatahoraPipeModule } from './../../pipes/datahora/datahora.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusVeiculosDetalheAlertasPageRoutingModule, 
    DatahoraPipeModule
  ],
  declarations: [MeusVeiculosDetalheAlertasPage, ContentAlertDrawer]
})
export class MeusVeiculosDetalheAlertasPageModule {}
