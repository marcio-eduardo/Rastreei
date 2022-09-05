import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalhesPage } from './meus-veiculos-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalhesPageRoutingModule {}
