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
    
    obtenerEquipos(token): Observable<any>{
        let headersToken = this.headers.set('Authorization', token)
        return this._http.get(this.url+'/obtenerEquipos', {headers:headersToken})
    }

    registrarEquipo(equipo, token, idLiga): Observable<any> {
        let headersToken = this.headers.set('Authorization', token)
        let params= JSON.stringify(equipo)
        return this._http.post(this.url+'/registrarEquipo/'+idLiga, params,{headers:headersToken})
    }

    obtenerEquiposLiga(ligaID:String): Observable<any>{
        let headersToken = this.headers.set('Authorization', this.token)
        return this._http.get(this.url + '/obtenerEquiposLiga/' + ligaID, {headers: this.headers})
    }


    editarEquipo(equipo, equipoID:String, token): Observable<any>{
        let headersToken = this.headers.set('Authorization', token)
        let params = JSON.stringify(equipo)
        return this._http.put(this.url+'/editarEquipo/'+ equipoID,params,{headers:headersToken})
    }

    eliminarEquipo(equipoID, token): Observable<any>{
        let headersToken = this.headers.set('Authorization', token)
        return this._http.delete(this.url+'/eliminarEquipo/'+equipoID,{headers:headersToken})
    }

    obtenerEquipoId(token, idEquipo): Observable<any>{
        let headersToken = this.headers.set('Authorization', token)
        return this._http.get(this.url+'/obtenerEquipoId/'+idEquipo,{headers:headersToken})
    }
}


