import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})

export class EquiposComponent implements OnInit {
  public token
  public equipoModel
  public equipoID
  public ligaID
  public equipos

  constructor(private _usuarioService:UsuarioService, private _equipoService: EquipoService) { 
    this.equipoModel = new Equipo("","","",0,0,0,0,0,0,0,0,"")

  }
  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this.obtenerEquipos()
  }

  obtenerEquiposLiga(ligaID){
    this._equipoService.obtenerEquiposLiga(ligaID).subscribe(
      response=>{
        this.equipoModel = response.encontrarEquipos
        console.log(this.equipoModel);
      }
    )
  }

  eliminarEquipo(){
      this._equipoService.eliminarEquipo(this.equipoID,this.token).subscribe(
         Response =>{
           console.log(Response);
           this.obtenerEquiposLiga(this.ligaID)
         }
      )
  }

  editarEquipo(){

  }

  registrarEquipo(){

  }

  obtenerEquipos(){
     this._equipoService.obtenerEquipos(this.token).subscribe(
       Response=>{
         this.equipoModel = Response.encontrarEquipos
         console.log(this.equipoModel);
       }
     )
   }
   
}
