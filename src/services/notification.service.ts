import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public http: HttpService
  ) { }

  public getAllNotifications() {
    return this.http.get(`${environment.url_api}/rastreadores/alertas`);
  }
}
