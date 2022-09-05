import { MeusVeiculosDetalheFiltrarDataPageModule } from './meus-veiculos-detalhe-filtrar-data/meus-veiculos-detalhe-filtrar-data.module';
import { MeusVeiculosComandosMovimentoPageModule } from './meus-veiculos-comandos-movimento/meus-veiculos-comandos-movimento.module';
import { MeusVeiculosComandosVelocidadePageModule } from './meus-veiculos-comandos-velocidade/meus-veiculos-comandos-velocidade.module';
import { MeusVeiculosComandosPageModule } from './meus-veiculos-comandos/meus-veiculos-comandos.module';
import { MeusVeiculosOrderPageModule } from './meus-veiculos-order/meus-veiculos-order.module';
import { MeusVeiculosFilterPageModule } from './meus-veiculos-filter/meus-veiculos-filter.module';
import { MeusVeiculosUrlPageModule } from './meus-veiculos-url/meus-veiculos-url.module';
import { MeusVeiculosUrlTempoPageModule } from './meus-veiculos-url-tempo/meus-veiculos-url-tempo.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

// // REMOVE TO IOS
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import 'hammerjs'; // HAMMER TIME


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: '',
      backButtonIcon: 'md-arrow-back'
    }),
    HttpClientModule,
    AppRoutingModule,
    MeusVeiculosFilterPageModule,
    MeusVeiculosOrderPageModule,
    MeusVeiculosComandosPageModule,
    MeusVeiculosComandosVelocidadePageModule,
    MeusVeiculosDetalheFiltrarDataPageModule,
    MeusVeiculosComandosMovimentoPageModule,
    MeusVeiculosUrlPageModule,
    MeusVeiculosUrlTempoPageModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    CallNumber,
    Network,
    FCM, //REMOVE TO IOS
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
