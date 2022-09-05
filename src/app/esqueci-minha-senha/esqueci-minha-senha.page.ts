import { UserService } from './../../services/user.service';
import { ForgotPasswordModel } from './../../models/forgotPasswor.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.page.html',
  styleUrls: ['./esqueci-minha-senha.page.scss'],
})
export class EsqueciMinhaSenhaPage implements OnInit {

  send: boolean = false;
  forgotForm: ForgotPasswordModel = new ForgotPasswordModel();

  constructor(
    private userSrv: UserService
  ) { }

  ngOnInit() {
  }

  async esqueciMinhaSenha() {
    const { success } = await this.userSrv.esqueciMinhaSenha(this.forgotForm);
    this.send = success;
  }

}
