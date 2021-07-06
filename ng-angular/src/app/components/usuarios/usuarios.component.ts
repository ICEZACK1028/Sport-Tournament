import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public idUsuarioModal: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.idUsuarioModal = new Usuario("","","","","","","","","","");
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this._usuarioService.listarUsuarios().subscribe(
      res=>{
        this.usuarios = res.usuariosListados;
      },
      err=>{
        console.log(<any>err);
      }
    )
  }

  verUsuario(idUsuario){
    this._usuarioService.verUsuario(idUsuario).subscribe(
      res=>{
        this.idUsuarioModal = res.verUsuario;
      },
      err=>{
        console.log(<any>err);
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuarioModal).subscribe(
      res=>{
        console.log(res);
        this.listarUsuarios();
      },err=>{
        console.log(<any>err);
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      res=>{
        console.log(res);
        this.listarUsuarios();
      }
    )
  }

  registroAdmin(){
    this._usuarioService.registrarAdmin(this.idUsuarioModal).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
    this.refreshPage();
  }

  refreshPage(){
    window.location.reload();
  }

}
