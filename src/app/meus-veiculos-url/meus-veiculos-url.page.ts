import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, Platform, AlertController } from '@ionic/angular';
import { urlModel } from 'src/models/urlModel';
import { QueryGenerateURLModel } from 'src/models/queryGenerateURLModel';
import { VehicleLocalizationModel } from 'src/models/vehicleLocalizationModel';
import { SpinnerService } from 'src/services/spinner.service';
import { VehicleService } from 'src/services/vehicle.service';
import { MeusVeiculosUrlTempoPage } from '../meus-veiculos-url-tempo/meus-veiculos-url-tempo.page';
import { environment } from './../../environments/environment';
import { AlertService } from './../../services/alert.service';

declare var cordova: any;

@Component({
  selector: 'app-meus-veiculos-url',
  templateUrl: './meus-veiculos-url.page.html',
  styleUrls: ['./meus-veiculos-url.page.scss'],
})
export class MeusVeiculosUrlPage implements OnInit {

  list: Array<urlModel> = new Array<urlModel>();
  vehicle: VehicleLocalizationModel = new VehicleLocalizationModel();

  constructor(private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    private alertSrv: AlertService,
    private modalCtrl: ModalController,
    private vehicleSrv: VehicleService,
    private spinnerSrv: SpinnerService,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
    const { state } = this.router.getCurrentNavigation().extras;
    if (!state) {
      this.navCtrl.navigateRoot('/meus-veiculos');
    } else {
      this.vehicle = state.vehicle;
      this.loadURLs();
    }


  }

  async loadURLs() {
    const { data } = await this.vehicleSrv.getLinkExterno(this.vehicle.id_veiculo);
    this.list = data as Array<urlModel>;

    // let dados: any = {};
    // dados.dt_criacao = '2021-02-17 17:57:11';
    // dados.chave_acesso = 'b4b20de4-7162-11eb-8ef8-0e1a6fae7b57';
    // dados.tempo_acesso = '12'
    // dados.flg_status = 1;
    // // dados = dados as INotifications;

    // this.list.push(dados as IURLs);

  }

  gerar_url = (pChaveAcesso: string) => {
    let vURL = `${environment.url_web}` + '/link_mapa/' + pChaveAcesso;
    return vURL
  }

  async criar() {
    const modal = await this.modalCtrl.create({
      component: MeusVeiculosUrlTempoPage,
      cssClass: 'meus-veiculos-url-tempo-page',
      componentProps: { vehicle: this.vehicle }
    });
    await modal.present();
    const { data: dataTempoAcesso } = await modal.onWillDismiss();
    if (dataTempoAcesso != undefined) {
      let query = new QueryGenerateURLModel();
      query.id_veiculo = this.vehicle.id_veiculo;
      query.placa = null;//this.vehicle.placa;
      query.tempo_acesso = dataTempoAcesso.tempo_acesso;
      query.flg_desabilitar_login = 0;

      await this.spinnerSrv.Show();
      const { data: dataLinkExterno } = await this.vehicleSrv.postGerarLinkExterno(query);
      await this.spinnerSrv.Hide();
      if (dataLinkExterno) {
        console.log(dataLinkExterno);

        let vURL = this.gerar_url(dataLinkExterno.link_externo); //`${environment.url_web}` + '/link_mapa/' + dataLinkExterno.result;
        this.platform.ready().then(() => {
          cordova.plugins.clipboard.copy(vURL);
          this.alertSrv.alert('Informação', 'URL copiada para área de transferência!');
        });
      }
      else {
        await this.spinnerSrv.Hide();
        this.alertSrv.alert('Informação', 'Não foi possivel gerar URL!');
      }
      this.loadURLs();
    }
  }

  copiar = (pChaveAcesso: string) => {
    if (pChaveAcesso) {
      // let vURL = `${environment.url_web}` + '/link_mapa/' + pChaveAcesso;
      this.platform.ready().then(() => {
        cordova.plugins.clipboard.copy(this.gerar_url(pChaveAcesso));
      });

      console.log(pChaveAcesso);
      this.alertSrv.alert('Informação', 'URL copiada para área de transferência!');
    }
    else {
      this.alertSrv.alert('Informação', 'Não foi possivel gerar URL!');
    }
  }

  abrir_url = (pChaveAcesso: string) => {
    if (pChaveAcesso) {
      // let vURL = `${environment.url_web}` + '/link_mapa/' + pChaveAcesso;
      window.open(this.gerar_url(pChaveAcesso), '_system', 'location=yes');
      // return;
      // this.platform.ready().then(() => {
      //   cordova.plugins.clipboard.copy(vURL);
      // });

      // console.log(pChaveAcesso);
      // this.alertSrv.alert('Informação', 'URL copiada para área de transferência!');
    }
    else {
      this.alertSrv.alert('Informação', 'Não foi possivel gerar URL!');
    }
  }

  async confirmCancelar() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'CONFIRMAR!',
        message: 'Deseja cancelar este link?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Sim',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  //// VERSAO SEM CONFIRMAÇAO DE INATIVAR LINK
  // async cancelar_link(pIdLinkExerno: number) {
  //   await this.spinnerSrv.Show();
  //   const { data: dataLinkExterno } = await this.vehicleSrv.putCancelarLinkExterno(this.vehicle.id_veiculo, pIdLinkExerno);
  //   await this.spinnerSrv.Hide();

  //   this.loadURLs();
  //   this.alertSrv.alert('Informação', 'URL cancelada com sucesso!');
  // }

  async cancelar(pIdLinkExerno: number) {
    if (pIdLinkExerno) {
      const confirmation = await this.confirmCancelar();
      if (confirmation) {
        await this.spinnerSrv.Show();
        await this.vehicleSrv.putCancelarLinkExterno(this.vehicle.id_veiculo, pIdLinkExerno);
        await this.spinnerSrv.Hide();
  
        this.loadURLs();
        this.alertSrv.alert('Informação', 'Link cancelado com sucesso!');
      }
    }
  }
  
}
