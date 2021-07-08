import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]
})
export class NavbarComponent implements OnInit {
  public identidad
  public idUsuarioModal
  public token
  public usuarioLogueado

  constructor(private _router: Router, public _usuarioService: UsuarioService) {
    this.idUsuarioModal = new Usuario("", "", "", "", "", "", "", "", "", "");
    this.usuarioLogueado = new Usuario("", "", "", "", "", "", "", "", "", "");
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit(): void {
    console.log(this.identidad);
    console.log(this.getUsuarioLogueado());
  }

  cerrarSesion() {
    sessionStorage.clear()
    // this._router.navigate(['/login'])
  }

  verUsuario(idUsuario) {
    this._usuarioService.verUsuario(idUsuario).subscribe(
      res => {
        this.idUsuarioModal = res.verUsuario;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  eliminarPerfil(idUsuario) {
    this._usuarioService.eliminarPerfil(idUsuario).subscribe(
      res => {
        console.log(res);
        this.cerrarSesion();
      }, err => {
        console.log(<any>err);

      }
    )
  }

  editarPerfil() {
    this._usuarioService.editarPerfil(this.idUsuarioModal).subscribe(
      res => {
        console.log(res);
        this.getUsuarioLogueado();
      }, err => {
        console.log(<any>err);
      }
    )
  }

  getUsuarioLogueado() {
    this._usuarioService.verUsuarioLogueado().subscribe(
      res => {
        console.log(res);
        this.usuarioLogueado = res.verUsuario;
      }, err => {
        console.log(<any>err);
      }
    )
  }

  refreshPage() {
    window.location.reload();
  }
}
