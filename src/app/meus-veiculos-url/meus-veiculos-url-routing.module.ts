import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosUrlPage } from './meus-veiculos-url.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosUrlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosUrlPageRoutingModule {}
