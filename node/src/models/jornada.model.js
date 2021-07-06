const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var JornadaSchema = Schema({
    nombre: String,
    liga: { type: Schema.Types.ObjectId, ref: 'ligas'},
    games: [{
        equipo1: { type: Schema.Types.ObjectId, ref: 'equipo'},
        equipo2: { type: Schema.Types.ObjectId, ref: 'equipo'},
        goles1: Number,
        goles2: Number,
    }]
    
})

module.exports = mongoose.model('jornada', JornadaSchema);