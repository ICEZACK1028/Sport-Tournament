import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public usuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModel = new Usuario("","","","","","","","","","");
   }

  ngOnInit(): void {
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
