import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { storeKeys } from '../shared/constants';

const isTokenSaved = !!localStorage.getItem(storeKeys.token);

const routes: Routes = [
  {
    path: '',
    redirectTo: isTokenSaved ? 'meus-veiculos' : 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'esqueci-minha-senha',
    loadChildren: () => import('./esqueci-minha-senha/esqueci-minha-senha.module').then(m => m.EsqueciMinhaSenhaPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./ajuda/ajuda.module').then(m => m.AjudaPageModule)
  },
  {
    path: 'meus-veiculos',
    loadChildren: () => import('./meus-veiculos/meus-veiculos.module').then(m => m.MeusVeiculosPageModule)
  },
  {
    path: 'trocar-senha',
    loadChildren: () => import('./trocar-senha/trocar-senha.module').then(m => m.TrocarSenhaPageModule)
  },
  {
    path: 'notificacoes',
    loadChildren: () => import('./notificacoes/notificacoes.module').then(m => m.NotificacoesPageModule)
  },
  {
  path: 'ver-mapa',
  loadChildren: () => import('./ver-mapa/ver-mapa.module').then(m => m.VerMapaPageModule)
  },
  {
    path: 'meus-veiculos-detalhes',
    loadChildren: () => import('./meus-veiculos-detalhes/meus-veiculos-detalhes.module').then(m => m.MeusVeiculosDetalhesPageModule)
  },
  {
    path: 'meus-veiculos-detalhe-alertas',
    loadChildren: () =>
      import('./meus-veiculos-detalhe-alertas/meus-veiculos-detalhe-alertas.module')
        .then(m => m.MeusVeiculosDetalheAlertasPageModule)
  },
  {
    path: 'meus-veiculos-detalhes-rota-texto',
    loadChildren: () =>
      import('./meus-veiculos-detalhes-rota-texto/meus-veiculos-detalhes-rota-texto.module')
        .then(m => m.MeusVeiculosDetalhesRotaTextoPageModule)
  },
  {
    path: 'meus-veiculos-detalhes-rota-mapa',
    loadChildren: () =>
      import('./meus-veiculos-detalhes-rota-mapa/meus-veiculos-detalhes-rota-mapa.module')
        .then(m => m.MeusVeiculosDetalhesRotaMapaPageModule)
  },
  {
    path: 'meus-veiculos-comandos-movimento',
    loadChildren: () => import('./meus-veiculos-comandos-movimento/meus-veiculos-comandos-movimento.module').then( m => m.MeusVeiculosComandosMovimentoPageModule)
  },
  {
    path: 'meus-veiculos-url',
    loadChildren: () => import('./meus-veiculos-url/meus-veiculos-url.module').then( m => m.MeusVeiculosUrlPageModule)
  },
  {
    path: 'meus-veiculos-url-tempo',
    loadChildren: () => import('./meus-veiculos-url-tempo/meus-veiculos-url-tempo.module').then( m => m.MeusVeiculosUrlTempoPageModule)
  },
  //{
  //////  path: 'google-maps',
  ////  loadChildren: () => import('./google-maps/google-maps.module').then( m => m.GoogleMapsPageModule)
  //},
  {
    path: 'meus-veiculos-detalhe-rota',
    loadChildren: () => import('./meus-veiculos-detalhe-rota/meus-veiculos-detalhe-rota.module').then( m => m.MeusVeiculosDetalheRotaPageModule)
  },
  {
    path: 'meus-veiculos-detalhes-rota-tipo',
    loadChildren: () => import('./meus-veiculos-detalhes-rota-tipo/meus-veiculos-detalhes-rota-tipo.module').then( m => m.MeusVeiculosDetalhesRotaTipoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
