import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga.model';
import { LigaService } from 'src/app/services/liga.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LigaService, UsuarioService]
})
export class HomeComponent implements OnInit {
  public ligaModelAdd
  public ligaModelGet
  public ligaModelId
  public idLiga
  public token;

  constructor(private _ligaService: LigaService, private _usuarioService: UsuarioService) { 
    this.token = this._usuarioService.getToken()
    this.ligaModelAdd = new Liga("","","","","")  
    this.ligaModelId = new Liga("","","","","")  
  }

  ngOnInit(): void {
    this.obtenerLigas()
  }

  obtenerLigas(){
    this._ligaService.obtenerLigas(this.token).subscribe(
      response => {
        this.ligaModelGet = response.ligasEncontradas
        console.log(response);
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
        this.obtenerLigas()
      }
    )
  }

  editarLiga(){
    this._ligaService.editarLiga(this.ligaModelId,this.idLiga,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerLigas()
      }
    )
  }

  eliminarLiga(){
    this._ligaService.eliminarLiga(this.idLiga,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerLigas()
      }
    )
  }
}
