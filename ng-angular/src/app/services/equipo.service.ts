import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service'

@Injectable({
  providedIn: 'root'
})

export class EquipoService {
    public url: String;
    public headers = new HttpHeaders().set('Content-type', 'application/json')
    public token;

    constructor(public _http: HttpClient) { 
        this.url = GLOBAL.url
    }

    registrarEquipo(equipo, token): Observable<any> {
        let headersToken = this.headers.set('Authorization', token)
        let params= JSON.stringify(equipo)
        return this._http.post(this.url+'/registrarEquipo', params,{headers:headersToken})
    }

}