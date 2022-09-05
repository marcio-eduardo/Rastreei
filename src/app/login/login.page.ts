import { ITokenResult } from './../../interfaces/ITokenResult';
import { storeKeys } from './../../shared/constants';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/user.service';
import { ILogin } from './../../interfaces/ILogin';
import { Component, OnInit } from '@angular/core';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AuthService } from "./../../services/auth.service";
import { environment } from '../../environments/environment';
import { IUserTokenPush } from './../../interfaces/IUserTokenPush';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	faAddressCard = faAddressCard;
	loginForm: ILogin = {};
	tooglePassword = false;
	isSavedLoginData: boolean = false;
	// vCodCliente = 0;
	vAppCliente = false;

	constructor(
		private userSrv: UserService,
		private alertSrv: AlertService,
		private network: Network,
		private router: Router,
		private AuthService: AuthService) {
		this.loginForm.cod_cliente = environment.cod_cliente;
		this.vAppCliente = environment.app_cliente;
	}

	ngOnInit() {
		const loginData = localStorage.getItem(storeKeys.loginData);
		if (loginData) {
			this.loginForm = JSON.parse(loginData) as ILogin;
			this.isSavedLoginData = true;
		}
	}

	async login(login: ILogin): Promise<void> {
		let networkState = this.network.type;
		if (networkState === 'No network connection') {
			this.alertSrv.alert('Informação', 'Rede de dados perdida.');
			return;
		}

		if ((login.cod_cliente == undefined || login.cod_cliente == null) || (login.username == undefined || login.username == '') || (login.password == undefined || login.password == '')) {
			this.alertSrv.alert('Informação', 'Informação de login inválida.');
			return;
		}

		this.AuthService
			.login(login)
			//.finally(() => loading.dismiss())
			.subscribe(
				(data) => {
					this.clearLoginData(false);

					if (this.loginForm.rememberMe) {
						localStorage.setItem(storeKeys.loginData, JSON.stringify(this.loginForm));
					}

					let token_push: string = localStorage.getItem("token_push");
					if (token_push != null) {
						let userTokenPush: IUserTokenPush = {token: null, app_key: null};
						userTokenPush.token = token_push;
						userTokenPush.app_key = environment.appKey;

						this.userSrv.postTokenPush(userTokenPush).then(res => {
							console.log('Token PUSH gravado no login');
						});
					}

					localStorage.setItem(storeKeys.user, JSON.stringify(this.decodeToken(data).data));
					this.router.navigateByUrl('/meus-veiculos');
					this.userSrv.getParametros().then(res => {
						if (res.data != null) {
							localStorage.setItem(storeKeys.parametros, JSON.stringify(res.data[0]));
							this.userSrv.setSubjectParametros(res.data[0]);
						}
						//this.userSrv.setUserParametros(res.data[0]);
					});
				},
				err => this.handleError(err));

		// const { data, error } = await this.userSrv.login(login);
		// if (error) {
		// 	this.alertSrv.alert('Informação', 'Não foi possível efetuar login.');
		// } else {
		// 	if (this.loginForm.rememberMe) {
		// 		localStorage.setItem(storeKeys.loginData, JSON.stringify(this.loginForm));
		// 	}

		// 	const { access_token } = data as ITokenResult;
		// 	localStorage.setItem(storeKeys.token, access_token);
		// 	localStorage.setItem(storeKeys.user, JSON.stringify(this.decodeToken(access_token).data));
		// 	this.router.navigateByUrl('/meus-veiculos');

		// 	this.userSrv.getParametros().then(res => {
		// 		if (res.data != null) {
		// 			localStorage.setItem(storeKeys.parametros, JSON.stringify(res.data[0]));
		// 			this.userSrv.setSubjectParametros(res.data[0]);
		// 		}
		// 		//this.userSrv.setUserParametros(res.data[0]);
		// 	});
		// }

	}

	handleError(error: any) {
		let message: string;
		if (error.status && error.status === 401) {
			message = 'Login inválido';
		}
		else {
			message = `Unexpected error: ${error.message}`;
		}

		this.alertSrv.alert('Informação', message);
	}

	clearLoginData(value) {
		if (this.isSavedLoginData && value === false) {
			localStorage.removeItem(storeKeys.loginData);
			localStorage.removeItem(storeKeys.parametros);
		}
	}

	decodeToken(token: string): any {
		const helper = new JwtHelperService();
		return helper.decodeToken(token);
	}

}
