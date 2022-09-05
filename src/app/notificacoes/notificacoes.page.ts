import { INotifications } from './../../interfaces/INotifications';
import { NotificationService } from './../../services/notification.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {

  list: INotifications[] = [];
  filterBy: string = 'placa';
  searchText: string = '';

  constructor(
    private alertCtrl: AlertController,
    private notificationSrv: NotificationService
  ) { }

  ngOnInit() {
    this.getAllNotifications();
  }

  async getAllNotifications() {
    const { data } = await this.notificationSrv.getAllNotifications();
    this.list = data as INotifications[];
  }

  async filter() {
    (await this.alertCtrl.create({
      header: 'FILTRAR POR',
      inputs: [{
        name: 'placa',
        type: 'radio',
        label: 'Placa',
        value: 'placa',
        checked: true
      },
      {
        name: 'tipo',
        type: 'radio',
        label: 'Tipo Notificação',
        value: 'assunto'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { }
      }, {
        text: 'Filtrar',
        handler: (value) => {
          this.filterBy = value;
        }
      }]
    })).present();
  }

    searchingHandler() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.list = this.list.filter(item => {
        return (item[this.filterBy].toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
      });
    } else {
      this.getAllNotifications();
    }
  }

}
