import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosFilterPage } from './meus-veiculos-filter.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosFilterPageRoutingModule {}
