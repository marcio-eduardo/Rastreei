import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalheFiltrarDataPage } from './meus-veiculos-detalhe-filtrar-data.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalheFiltrarDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalheFiltrarDataPageRoutingModule {}
