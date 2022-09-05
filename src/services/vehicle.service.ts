import { IRouterFilter } from './../interfaces/IRouterFilter';
import { QueryLocalizacaoModel } from './../models/queryLocalizacaoModel';
import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { VehicleLocalizationModel } from './../models/vehicleLocalizationModel';
import { Subject } from 'rxjs';
import { QueryGenerateURLModel } from 'src/models/queryGenerateURLModel';

@Injectable({
	providedIn: 'root'
})
export class VehicleService {

	private vehicleSelected = new VehicleLocalizationModel();
	private subjectSelected = new Subject<VehicleLocalizationModel>();

	subjectSelected$ = this.subjectSelected.asObservable();

	constructor(
		public http: HttpService
	) { }

	public getLocalizacao(query: QueryLocalizacaoModel) {
		return this.http.getws(`${environment.url_api}/api/localizacao`, query);
	}

	// tslint:disable-next-line: variable-name
	public getAlerts(id_rastreador: number) {
		return this.http.get(`${environment.url_api}/rastreadores/${id_rastreador}/alertas`);
	}

	public getRoute(filter: IRouterFilter) {
		return this.http.post(`${environment.url_api}/api/localizacao/get_rota`, filter);
	}

	public getAddress(pPositionId: string, pDtLocalizacao: string, pLatitude: string, pLongitude: string) {
		var url = `${environment.url_api}/api/localizacao/get_street`;
		let dados = {
			"id_localizacao": pPositionId,
			"latitude": pLatitude,
			"longitude": pLongitude,
			"dt_localizacao": pDtLocalizacao
		}

		return this.http.post(url, dados);
	}

	setSelected(selected: VehicleLocalizationModel) {
		this.subjectSelected.next(selected);
	}

	public postGerarLinkExterno(query: QueryGenerateURLModel) {
		let link_externo: any = { link_externo: query }
		return this.http.post(`${environment.url_api}/api/localizacao/link_externo`, link_externo);
	}

	public getLinkExterno(id_veiculo: number) {
		return this.http.get(`${environment.url_api}/veiculos/${id_veiculo}/link_externo`, id_veiculo);
	}

	public putCancelarLinkExterno(id_veiculo: number, id_link_externo: number) {
		let dados: any = { status: {id_status : 0}}
		return this.http.put(`${environment.url_api}/veiculos/${id_veiculo}/link_externo/${id_link_externo}`, dados);
	}
}
