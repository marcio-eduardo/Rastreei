import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosPage } from './meus-veiculos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosPageRoutingModule {}
