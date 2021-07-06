import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service'

@Injectable({
  providedIn: 'root'
})
export class LigaService {
  public url: String;
  public headers = new HttpHeaders().set('Content-type', 'application/json')
  public token;

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  obtenerLigas(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerLigas',{headers:headersToken})
  }
  
  obtenerLigaId(id: String): Observable<any>{
    return this._http.get(this.url+'/obtenerLigaId/'+ id, {headers: this.headers})
  }
  
  agregarLiga(liga,token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(liga)
    return this._http.post(this.url+'/registrarLiga',params,{headers:headersToken})
  }
  
  editarLiga(liga,idLiga,token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(liga)
    return this._http.put(this.url+'/editarLiga/'+idLiga,params,{headers:headersToken})
  }
  
  eliminarLiga(idLiga,token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.delete(this.url+'/eliminarLiga/'+idLiga,{headers:headersToken})
  }
  
  obtenerLigasAll(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerLigasAll',{headers:headersToken})
  }
  
}
