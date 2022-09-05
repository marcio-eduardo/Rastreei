import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosUrlTempoPage } from './meus-veiculos-url-tempo.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosUrlTempoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosUrlTempoPageRoutingModule {}
