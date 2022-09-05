import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocarSenhaPageRoutingModule } from './trocar-senha-routing.module';

import { TrocarSenhaPage } from './trocar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrocarSenhaPageRoutingModule
  ],
  declarations: [TrocarSenhaPage]
})
export class TrocarSenhaPageModule {}
