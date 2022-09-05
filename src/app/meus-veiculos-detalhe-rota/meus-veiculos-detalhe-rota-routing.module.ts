import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalheRotaPage } from './meus-veiculos-detalhe-rota.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalheRotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalheRotaPageRoutingModule {}
