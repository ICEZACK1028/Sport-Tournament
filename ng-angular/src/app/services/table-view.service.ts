import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TableViewService {
  public url: String;
  public headers = new HttpHeaders().set('Content-type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  obtenerJornadaPorLiga(id: String): Observable<any> {
    return this._http.get(this.url + '/obtenerJornadaPorLiga/' + id, { headers: this.headers })
  }
}
