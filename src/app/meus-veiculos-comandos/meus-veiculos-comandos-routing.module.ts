import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosComandosPage } from './meus-veiculos-comandos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosComandosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosComandosPageRoutingModule {}
