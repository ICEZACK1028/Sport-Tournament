import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga.model';
import { Jornada } from 'src/app/models/jornada.model';
import { LigaService } from 'src/app/services/liga.service';
import { ActivatedRoute } from '@angular/router';
import { TableViewService } from 'src/app/services/table-view.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  public ligaModel
  public jornadaModel
  public ligaID
  public idLiga

  constructor(private _ligaService: LigaService, private _activatedRoute: ActivatedRoute, private _tableService: TableViewService) {
    this.ligaModel = new Liga("", "", "", "", ""),
      this.jornadaModel = new Jornada("", "", 0, "", [{
        equipo1: "",
        equipo2: "",
        goles1: 0,
        goles2: 0,
        nombre1: "",
        nombre2: ""
      }])
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta => {
      this.ligaID = dataRuta.get('idLiga');
    })
    this.obtenerIdLiga(this.ligaID)
    this.obtenerJornadaPorLiga(this.ligaID)
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

}
