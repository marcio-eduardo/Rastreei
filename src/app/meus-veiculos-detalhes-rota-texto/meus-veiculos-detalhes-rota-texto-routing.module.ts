import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalhesRotaTextoPage } from './meus-veiculos-detalhes-rota-texto.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalhesRotaTextoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalhesRotaTextoPageRoutingModule {}
