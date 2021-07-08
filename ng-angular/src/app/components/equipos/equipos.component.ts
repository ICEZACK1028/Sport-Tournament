import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { Liga } from 'src/app/models/liga.model';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JornadaService } from 'src/app/services/jornada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [LigaService, EquipoService, JornadaService],
})

export class EquiposComponent implements OnInit {
  public token
  public equipoModel
  public equiposLiga
  public ligaModel
  public equipoID
  public ligaID
  public equipos
  public idLiga
  public equipoModelId
  public equipoModelGet
  public equipoModelAdd
  public partidos
  static partidos: any;

  constructor(private _usuarioService: UsuarioService, private _equipoService: EquipoService,
    private _ligaService: LigaService, private _jornadaService: JornadaService, private _activatedRoute: ActivatedRoute) {
    this.equipoModel = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.equiposLiga = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.equipoModelId = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.equipoModelGet = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.equipoModelAdd = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.ligaModel = new Liga("", "", "", "", "")

  }
  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    // this.obtenerEquipos()
    this._activatedRoute.paramMap.subscribe(dataRuta => {
      this.ligaID = dataRuta.get('idLiga');
    })
    this.obtenerEquiposLiga()
    this.obtenerIdLiga(this.ligaID)
  }

  obtenerIdLiga(idLiga) {
    this._ligaService.obtenerLigaId(idLiga).subscribe(
      response => {
        this.ligaModel = response.ligaEncontrada
        this.idLiga = idLiga
        console.log(response);
      }
    )
  }

  eliminarEquipo() {
    this._equipoService.eliminarEquipo(this.equipoID, this.token).subscribe(
      Response => {
        console.log(Response);
        this.obtenerEquiposLiga()
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
        this.obtenerEquiposLiga()
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

  obtenerEquiposLiga() {
    this._equipoService.obtenerEquiposLiga(this.ligaID).subscribe(
      response => {
        this.equiposLiga = response.equiposEncontrados
        console.log(this.equiposLiga);
      }
    )
  }

  obtenerEquipoId(idEquipo) {
    this._equipoService.obtenerEquipoId(this.token, idEquipo).subscribe(
      response => {
        this.equipoModelId = response.equipoEncontrado
        this.equipoID = idEquipo
        console.log(response);
      }
    )
  }

  iniciarLiga() {
    this._jornadaService.iniciarLiga(this.ligaID).subscribe(
      response => {
        console.log(response);
        this.partidos = response.juegosNombres
      }
    )
  }


}
