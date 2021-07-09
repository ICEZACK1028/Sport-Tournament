import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { LigaService } from 'src/app/services/liga.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JornadaService } from 'src/app/services/jornada.service';
import Swal from 'sweetalert2';
import { Liga } from 'src/app/models/liga.model';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.scss'],
  providers:[LigaService,EquipoService,UsuarioService]
})

export class EquiposAdminComponent implements OnInit {
  public token
  public idEquipo
  public equipoModelAdd
  public equipoModelGet: Equipo[]
  public equipoModelEdit
  public equipoModelId
  public ligasUsuario: Liga[] 
  public idLiga

  constructor(public _usuarioService: UsuarioService, public _equipoService: EquipoService, public _ligaService: LigaService) { 
    this.equipoModelAdd = new Equipo('','','',0,0,0,0,0,0,0,0,'')
    // this.equipoModelGet = new Equipo('','','',0,0,0,0,0,0,0,0,'')

    this.equipoModelId = new Equipo('','','',0,0,0,0,0,0,0,0,'')
    this.equipoModelEdit = new Equipo('','','',0,0,0,0,0,0,0,0,'')
    // this.ligasUsuario = new Liga('','','','','')
  }

  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this.obtenerEquipos()
    this.obtenerLigasUsuario()
  }

  obtenerEquipos(){
    this._equipoService.obtenerEquipos(this.token).subscribe(
      response => {
        this.equipoModelGet = response.encontrarEquipos
        console.log(this.equipoModelGet);
      }
    )
  }

  obtenerEquipoId(idEquipo){
    this._equipoService.obtenerEquipoId(idEquipo).subscribe(
      response => {
        this.equipoModelId = response.equipoEncontrado
        this.idEquipo = this.equipoModelId._id
        console.log(this.equipoModelId);
      }
    )
  }

  registrarEquipo(){
    console.log(this.idLiga);
    console.log(this.equipoModelAdd)
    this._equipoService.registrarEquipo(this.equipoModelAdd,this.token,this.idLiga).subscribe(
      response => {
        console.log(response);
        this.obtenerEquipos()
      }
    )
  }

  editarEquipo(){
    this._equipoService.editarEquipo(this.equipoModelId,this.idEquipo,this.token).subscribe(
      response => {
        console.log(response);
        this.equipoModelId = response.equipoActualizado
        this.obtenerEquipos()
      }
    )
  }

  eliminarEquipo(){
    this._equipoService.eliminarEquipo(this.idEquipo, this.token).subscribe(
      response => {
        console.log('Se ha eliminado el equipo');
        this.obtenerEquipos()
      }
    )

  }

  obtenerLigasUsuario(){
    this._ligaService.obtenerLigas(this.token).subscribe(
      response => {
        this.ligasUsuario = response.ligasEncontradas
        console.log(this.ligasUsuario);
      }
    )
  }

  obtenerIdLiga(idLiga){
    this.idLiga = idLiga
  } 

}

