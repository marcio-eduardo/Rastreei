import { UserService } from './../../services/user.service';
import { AlertService } from './../../services/alert.service';
import { ChangepPasswordModel } from './../../models/changePassword.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {

  toogleLastPassword: boolean = false;
  toogleNewPassWord: boolean = false;
  toogleConfirmNewPassword: boolean = false;
  changeForm: ChangepPasswordModel = new ChangepPasswordModel();

  constructor(
    private alertSrv: AlertService,
    private navCtrl: NavController,
    private userSrv: UserService
  ) { }

  ngOnInit() {
  }

  private alertValidation(field: string): void {
    this.alertSrv.alert('Atenção', `Você deve preenchear o campo ${field}`);
  }

  async save() {
    const { password_atual, password, repassword } = this.changeForm;

    if (!password_atual) { this.alertValidation('Senha Antiga'); return; }
    if (!password) { this.alertValidation('Nova Senha'); return; }
    if (!repassword) { this.alertValidation('Repita a nova Senha'); return; }

    if (password !== repassword) {
      this.alertSrv.alert('Atenção', 'A nova senha é diferente da confirmação');
      return;
    }
    if (password.length < 6) {
      this.alertSrv.alert('Atenção', 'A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    const { success, error } = await this.userSrv.trocarSenha(this.changeForm);
    if (success) {
      await this.alertSrv.alert('', 'Sua senha foi redefinida com sucesso!');
      this.navCtrl.navigateRoot('/meus-veiculos');
    } else {
      this.alertSrv.alert('Ops', 'Não foi possível alterar sua senha, tente novamente mais tarde');
      console.log('error', error);
    }
  }

}
