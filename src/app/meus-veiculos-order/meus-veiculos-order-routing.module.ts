import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosOrderPage } from './meus-veiculos-order.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosOrderPageRoutingModule {}
