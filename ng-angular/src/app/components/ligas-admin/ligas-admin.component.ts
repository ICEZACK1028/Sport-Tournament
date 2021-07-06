import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga.model';
import { LigaService } from 'src/app/services/liga.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ligas-admin',
  templateUrl: './ligas-admin.component.html',
  styleUrls: ['./ligas-admin.component.scss'],
  providers:[UsuarioService,LigaService]
})
export class LigasAdminComponent implements OnInit {
  public token
  public ligasModel
  public ligaModelAdd
  public usuarioObjeto
  public ligaModelId
  public idLiga

  constructor(private _usuarioService: UsuarioService,private _ligaService: LigaService) { 
    this.ligasModel = new Liga("","","","","")
    this.ligaModelAdd = new Liga("","","","","")
    this.ligaModelId = new Liga("","","","","")
  }

  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this.obtenerLigasAll()
  }

  obtenerLigasAll(){
    this._ligaService.obtenerLigasAll(this.token).subscribe(
      response => {
        this.ligasModel = response.ligasEncontradas
        console.log(this.ligasModel);
      }
    )
  }

  obtenerIdLiga(idLiga){
    this._ligaService.obtenerLigaId(idLiga).subscribe(
      response => {
        this.ligaModelId = response.ligaEncontrada
        this.idLiga = idLiga
        console.log(response);
      }
    )
  }

  agregarLiga(){
    this._ligaService.agregarLiga(this.ligaModelAdd,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerLigasAll()
      }
    )
  }

  editarLiga(){
    this._ligaService.editarLiga(this.ligaModelId,this.idLiga,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerLigasAll()
      }
    )
  }

  eliminarLiga(){
    this._ligaService.eliminarLiga(this.idLiga,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerLigasAll()
      }
    )
  }

}
