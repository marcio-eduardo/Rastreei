import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMapaPageRoutingModule } from './ver-mapa-routing.module';

import { VerMapaPage } from './ver-mapa.page';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMapaPageRoutingModule
  ],
  declarations: [VerMapaPage],
  providers:[Geolocation]
})
export class VerMapaPageModule {}
