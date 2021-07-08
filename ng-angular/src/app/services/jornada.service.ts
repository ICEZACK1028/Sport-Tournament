import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  public url: String;
  public headers = new HttpHeaders().set('Content-type', 'application/json')
  public token;

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  iniciarLiga(idLiga): Observable<any>{
    return this._http.post(this.url+'/iniciarLiga/'+ idLiga,{}, {headers: this.headers})
  }
}
