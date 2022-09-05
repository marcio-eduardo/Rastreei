import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusVeiculosComandosVelocidadePage } from './meus-veiculos-comandos-velocidade.page';

const routes: Routes = [
  {
    path: '',
    component: MeusVeiculosComandosVelocidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusVeiculosComandosVelocidadePageRoutingModule {}
