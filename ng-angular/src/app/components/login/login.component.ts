import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario
  public token
  public identidad

  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    this.usuarioModel = new Usuario("","","","","","","","","","");
  }

  ngOnInit(): void {
    this.transicionRegistro();
  }

  getToken(){
    this._usuarioService.login(this.usuarioModel,'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token',this.token)
      },
      error=> {
        console.log(<any>error);
      }
    )
  }

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response => {
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken()
        this._router.navigate(['/home'])
      },
      error => {
        console.log(<any>error);
      }
    )
    this.getToken()
  }

  transicionRegistro(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  registro(){
    this._usuarioService.registro(this.usuarioModel).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
