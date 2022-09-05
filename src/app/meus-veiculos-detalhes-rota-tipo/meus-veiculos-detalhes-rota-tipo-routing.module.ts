import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalhesRotaTipoPage } from './meus-veiculos-detalhes-rota-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalhesRotaTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalhesRotaTipoPageRoutingModule {}
