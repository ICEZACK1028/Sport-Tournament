import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-type','application/json')
  public identidad;
  public token;
  public user: Usuario;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  JsonConvert(Var){
    let convertVar = JSON.stringify(Var);
    return convertVar;
  }

  login(usuario, obtenerToken=null):Observable<any>{
    if (obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }
    return this._http.post(this.url + '/login', this.JsonConvert(usuario),{headers:this.headersVariable})
  }

  getIdentidad(){
    var identidad2 = JSON.parse(sessionStorage.getItem('identidad'))
    if (identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad =null;
    }
    return this.identidad
  }

  getToken(){
    var token2 = sessionStorage.getItem('token')
    if (token2 != 'undefined'){
      this.token = token2
    }else{
      this.token = null;
    }
    return this.token;
  }

  registro(usuario: Usuario): Observable<any>{
    return this._http.post(`${this.url}/registrarUsuario`, this.JsonConvert(usuario), {headers: this.headersVariable});
  }

  registrarAdmin(usuario: Usuario): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.post(`${this.url}/registrarAdministrador`, this.JsonConvert(usuario), {headers: headersToken});
  }

  listarUsuarios(): Observable<any>{
    return this._http.get(`${this.url}/listarUsuarios`, {headers: this.headersVariable});
  }

  verUsuario(id:string): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.get(`${this.url}/verUsuario/${id}`, {headers: headersToken});
  }

  verUsuarioLogueado(): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.get(`${this.url}/verUsuarioLogueado`, {headers: headersToken});
  }

  editarUsuario(usuario: Usuario): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.put(`${this.url}/editarUsuario/${usuario._id}`, this.JsonConvert(usuario), {headers: headersToken});
  }

  editarPerfil(usuario: Usuario): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.put(`${this.url}/editarPerfil/${usuario._id}`, this.JsonConvert(usuario), {headers: headersToken});
  }

  eliminarUsuario(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.delete(`${this.url}/eliminarUsuario/${id}`, {headers: headersToken});
  }

  eliminarPerfil(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());

    return this._http.delete(`${this.url}/eliminarPerfil/${id}`, {headers: headersToken});
  }

}
