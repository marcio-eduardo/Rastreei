import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { storeKeys } from './../shared/constants';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { map } from 'rxjs/operators';
import { ITokenResult } from './../interfaces/ITokenResult';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authUser = new ReplaySubject<any>(1);
	private readonly jwtHelper: JwtHelperService = new JwtHelperService();

	constructor(
		private http: HttpClient) {

	}

	checkLogin() {
		let jwt = localStorage.getItem(storeKeys.token);

		if (jwt === 'undefined') {
			this.logout();
		}
		else {
			if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
				this.authUser.next(jwt);
			}
			else {
				this.logout();
			}
		}


	}

	login(values: any): Observable<any> {
		return this.http.post(`${environment.url_api}/token`, values).pipe(
			map(response =>  {
				//console.log(response);
				return JSON.stringify(response);
			}),
			map(jwt => this.handleJwtResponse(jwt))
		)
	}

	logout() {
		localStorage.removeItem(storeKeys.token);
		localStorage.removeItem(storeKeys.user);
		this.authUser.next(null);
	}

	private handleJwtResponse(jwt: string) {
		const { access_token } = JSON.parse(jwt) as ITokenResult;

		//localStorage.setItem('jwt', access_token);
		this.authUser.next(JSON.parse(jwt).access_token);

		localStorage.setItem(storeKeys.token, access_token);
		localStorage.setItem(storeKeys.user, JSON.stringify(this.jwtHelper.decodeToken(access_token).data));

		return access_token;
	  }
}
