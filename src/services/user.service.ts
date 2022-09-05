import { IUserInfo } from './../interfaces/IUserInfo';

import { ChangepPasswordModel } from './../models/changePassword.model';
import { environment } from './../environments/environment';
import { ILogin } from './../interfaces/ILogin';
import { IParametros } from './../interfaces/IParametros';
import { IUserTokenPush } from './../interfaces/IUserTokenPush';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ForgotPasswordModel } from '../models/forgotPasswor.model';
import { storeKeys } from '../shared/constants';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private aParametros: Array<IParametros>;
	private subjectParametros = new Subject<Array<IParametros>>();
	subjectParametros$ = this.subjectParametros.asObservable();

	constructor(public http: HttpService) { }

	public login(login: ILogin) {
		return this.http.post(`${environment.url_api}/token`, login);
	}

	public esqueciMinhaSenha(forgotPassword: ForgotPasswordModel) {
		return this.http.post(`${environment.url_api}/token/esqueci_senha`, forgotPassword);
	}

	public trocarSenha(changePassword: ChangepPasswordModel) {
		const userInfo = this.getUserData();
		return this.http.put(`${environment.url_api}/usuarios/${userInfo.id_usuario}/password`, changePassword);
	}

	public getUserData() {
		const data = localStorage.getItem(storeKeys.user);
		if (data) {
			return JSON.parse(data) as IUserInfo;
		} else {
			return null;
		}
	}

	// public setUserParametros(pDados: any) {
	// 	if (pDados) {
	// 		this.aParametros = pDados as Array<IParametros>;
	// 	}
	// }

	public getUserParametros(): Array<IParametros> {
		const data = localStorage.getItem(storeKeys.parametros);
		//console.log(data);
		if (data && JSON.parse(data).length > 0) {
			return JSON.parse(data) as Array<IParametros>;
		}
		else {
			this.getParametros().then(res => {
				if (res.data != null) {
					localStorage.setItem(storeKeys.parametros, JSON.stringify(res.data[0]));
					return res.data[0] as Array<IParametros>;
				}
			});
			return [];
		}
	}

	public getParametros() {
		return this.http.getws(`${environment.url_api}/usuarios/parametros`);
	}

	setSubjectParametros(selected: Array<IParametros>) {
		this.subjectParametros.next(selected);
	}

	public postTokenPush(pUserTokenPush: IUserTokenPush) {
		return this.http.post(`${environment.url_api}/usuarios/token_push`, pUserTokenPush);
	}

}
