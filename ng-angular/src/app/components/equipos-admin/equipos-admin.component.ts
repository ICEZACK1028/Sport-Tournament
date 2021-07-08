import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JornadaService } from 'src/app/services/jornada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.scss'],
  providers:[LigaService,EquipoService]
})

export class EquiposAdminComponent implements OnInit {
  public token
  public equipoID
  public equipoModel

  public equiposLiga
  public ligaModel

  public ligaID
  public equipos
  public idLiga
  public idEquipo
  public equipoModelId
  public equipoModelGet
  public equipoModelAdd
  public obtenerEquiposLiga
 

  constructor(private _usuarioService: UsuarioService, private _equipoService: EquipoService) { 
     this.equipoModel = new Equipo("","","",0,0,0,0,0,0,0,0,"")


  }

  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this.obtenerEquipos()
  }


  eliminarEquipo() {
    this._equipoService.eliminarEquipo(this.equipoID, this.token).subscribe(
      Response => {
        console.log(Response);
        this.obtenerEquiposLiga()
      }
    )
  }

  obtenerIdEquipo(idEquipo){
    this._equipoService.obtenerEquipoId(idEquipo).subscribe(
      response => {
        this.equipoModel = response.equipoEncontrado
        this.idEquipo = idEquipo
        console.log(response);
      }
    )
  }


  editarEquipo() {
    console.log(this.equipoID);
    console.log(this.equipoModelId);
    this._equipoService.editarEquipo(this.equipoModelId, this.equipoID, this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerEquiposLiga()
      }
    )
  }

  registrarEquipo() {
    this._equipoService.registrarEquipo(this.equipoModelAdd, this.token, this.ligaID).subscribe(
      response => {
        console.log(response);
        this.obtenerEquipos()
        this.equipoModelAdd.nombre = ""
        this.equipoModelAdd.imagen = ""
      },
      (error) =>{
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No pueden haber mas de 10 equipos',
          showConfirmButton: false,
          timer: 1500,
        });
        
      }
    )
  }

  obtenerEquipos() {
    this._equipoService.obtenerEquipos(this.token).subscribe(
      Response => {
        this.equipoModel = Response.encontrarEquipos
        console.log(this.equipoModel);
      }
    )
  }


}
