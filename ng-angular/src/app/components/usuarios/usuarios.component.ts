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

  constructor(private _usuarioService: UsuarioService) {

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

}
