import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosDetalheAlertasPage } from './meus-veiculos-detalhe-alertas.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosDetalheAlertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosDetalheAlertasPageRoutingModule {}
