import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalhesRotaMapaPage } from './meus-veiculos-detalhes-rota-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalhesRotaMapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalhesRotaMapaPageRoutingModule {}
