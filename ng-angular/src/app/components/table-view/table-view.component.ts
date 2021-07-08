import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga.model';
import { Jornada } from 'src/app/models/jornada.model';
import { Equipo } from 'src/app/models/equipo.model';
import { EquipoService } from 'src/app/services/equipo.service';
import { LigaService } from 'src/app/services/liga.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { TableViewService } from 'src/app/services/table-view.service';
// import { EquiposComponent } from '../equipos/equipos.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [EquipoService,UsuarioService,LigaService]
})
export class TableViewComponent implements OnInit {

  public ligaModel
  public token
  public jornadaModel
  public equipoModel
  public ligaID
  public idLiga
  // public partidos2 = EquiposComponent.partidos

  constructor(private _ligaService: LigaService,
    private _activatedRoute: ActivatedRoute,
    private _tableService: TableViewService,
    private _equipoService: EquipoService,
    private _usuarioService: UsuarioService) {
    this.ligaModel = new Liga("", "", "", "", ""),
      this.jornadaModel = new Jornada("", "", 0, "", [{
        equipo1: "",
        equipo2: "",
        goles1: 0,
        goles2: 0,
        nombre1: "",
        nombre2: ""
      }])
    this.equipoModel = new Equipo("", "", "", 0, 0, 0, 0, 0, 0, 0, 0, "")
  }

  ngOnInit(): void {
    this.token = this._usuarioService.getToken()
    this._activatedRoute.paramMap.subscribe(dataRuta => {
      this.ligaID = dataRuta.get('idLiga');
    })
    this.obtenerIdLiga(this.ligaID)
    this.obtenerJornadaPorLiga(this.ligaID)
    // console.log( this.partidos2);
  }

  obtenerIdLiga(idLiga) {
    this._ligaService.obtenerLigaId(idLiga).subscribe(
      response => {
        this.ligaModel = response.ligaEncontrada
        this.idLiga = idLiga
      }
    )
  }

  obtenerJornadaPorLiga(idLiga) {
    this._tableService.obtenerJornadaPorLiga(idLiga).subscribe(
      response => {
        this.jornadaModel = response.jornadasEncontradas
      }
    )
  }

  obtenerEquipoPorId(idEquipo) {
    this._equipoService.obtenerEquipoId(this.token, idEquipo).subscribe(
      response => {
        this.equipoModel = response.equipoEncontrado
        console.log(response);
      }
    )
  }

}
