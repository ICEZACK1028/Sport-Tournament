import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
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
        sessionStorage.setItem('token',this.token)
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
        sessionStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Bienvenido`,
          showConfirmButton: false,
          timer: 1500
        })
        if(this.identidad.rol == "ROL_ADMIN")this._router.navigate(['/home-admin'])
        if(this.identidad.rol == "ROL_USUARIO")this._router.navigate(['/home'])
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Usuario o contraseña
                    incorrecta`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Usuario creado con éxito`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this.refreshPage();
      });
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Error al crear
          el usuario`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  refreshPage(){
    window.location.reload();
  }

}
