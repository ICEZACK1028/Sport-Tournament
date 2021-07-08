import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { Liga } from 'src/app/models/liga.model';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [LigaService, EquipoService],
})

export class EquiposComponent implements OnInit {
  public token
  public equipoModel
  public ligaModel
  public equipoID
  public ligaID
  public equipos
  public idLiga

  constructor(private _usuarioService: UsuarioService, private _equipoService: EquipoService, private _ligaService: LigaService, private _activatedRoute: ActivatedRoute) {
    this.equipoModel = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
    this.ligaModel = new Liga("", "", "", "", "")

  }
  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this.obtenerEquipos()
    this._activatedRoute.paramMap.subscribe(dataRuta => {
      this.ligaID = dataRuta.get('idLiga');
    })
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

  obtenerEquiposLiga(ligaID) {
    this._equipoService.obtenerEquiposLiga(ligaID).subscribe(
      response => {
        this.equipoModel = response.encontrarEquipos
        console.log(this.equipoModel);
      }
    )
  }

  eliminarEquipo() {
    this._equipoService.eliminarEquipo(this.equipoID, this.token).subscribe(
      Response => {
        console.log(Response);
        this.obtenerEquiposLiga(this.ligaID)
      }
    )
  }

  editarEquipo() {

  }

  registrarEquipo() {

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
