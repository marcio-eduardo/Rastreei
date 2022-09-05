import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommandService {

	constructor(
		public http: HttpService
	) { }

	public speed_verify(id_rastreador: number) {
		return this.http.getws(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/10`);
	}
	public speed(velocidade: number, id_rastreador: number) {
		return this.http.post(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/10`, { valor_comando: velocidade });
	}

	public lock_verify(id_rastreador: number) {
		return this.http.getws(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/6`);
	}
	public lock(id_rastreador: number) {
		return this.http.post(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/6`, { });
	}
	public unlock(id_rastreador: number) {
		return this.http.post(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/7`, { });
	}

	public moviment_verify(id_rastreador: number) {
		return this.http.getws(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/11`);
	}
	public moviment(id_rastreador: number, valor:  string ) {
		return this.http.post(`${environment.url_api}/rastreadores/${id_rastreador}/comandos/tipo_comandos/11`, { valor_comando: valor });
	}

	public get_rastreador_alerta_notificacao_verify(id_rastreador: number, id_tipo_alerta: number) {
		return this.http.getws(`${environment.url_api}/rastreadores/${id_rastreador}/alertas/tipo_alertas_notificacao/${id_tipo_alerta}`);
	}

	public alerta_login_notificacao(id_rastreador: number, id_tipo_alerta: number) {
		return this.http.getws(`${environment.url_api}/rastreadores/${id_rastreador}/alertas/login/notificacao/${id_tipo_alerta}`);
	}

	public insert_alerta_login_notificacao(id_rastreador: number, id_tipo_alerta: number, id_status: number ) {
		return this.http.post(`${environment.url_api}/rastreadores/${id_rastreador}/alertas/login/notificacao/${id_tipo_alerta}`, { id_status: id_status });
	}
	public update_alerta_login_notificacao(id_rastreador: number, id_tipo_alerta: number, id_status: number ) {
		return this.http.put(`${environment.url_api}/rastreadores/${id_rastreador}/alertas/login/notificacao/${id_tipo_alerta}`, { id_status: id_status });
	}
}