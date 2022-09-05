import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjudaPageRoutingModule } from './ajuda-routing.module';

import { AjudaPage } from './ajuda.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjudaPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [AjudaPage]
})
export class AjudaPageModule {}
