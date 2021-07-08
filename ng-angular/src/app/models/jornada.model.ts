export class Jornada {
  constructor(
    public _id: String,
    public nombre: String,
    public numero: Number,
    public liga: String,
    public games: [{
      equipo1: String,
      nombre1: String,
      equipo2: String,
      nombre2: String,
      goles1: Number,
      goles2: Number,
    }]
  ) { }
}
