'use strict'
const jornadaModel = require('../models/jornada.model')

function crearJornada(req,res){
    var jornadaConstructor = new jornadaModel();
    var ligaId = req.params.ligaId;
    var equipos = ["equipo 1", "equipo 2", "equipo 3", "equipo 4", "equipo 5", "equipo 6",];
    
    jornadaConstructor.nombre = params.nombre;
    jornadaConstructor.liga = ligaId;
    jornadaConstructor.games = [];
        for (var i = 0; i < equipos.length - 1; i++) {
            for (var j = i + 1; j < equipos.length; j++) {
            jornadaConstructor.games.push(
                jornadaConstructor.goles1 = 0,
                jornadaConstructor.goles2 = 0,
                jornadaConstructor.equipo1 = equipos[i],
                jornadaConstructor.equipo2 = equipos[j],
                ); 
            }
          }
   
      

    jornadaModel.find({nombre: params.nombre},(err,jornadaEncontrada) => {
        // console.log(jornadaEncontrada);
        if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
        // if (jornadaEncontrada) return res.status(500).send({mensaje: 'Está jornada ya existe'});

        jornadaConstructor.save((err, jornadaGuardada) => {
            // console.log(jornadaGuardada);
            console.log(err);
            if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
            return res.status(200).send({jornadaGuardada})
        })
    })
}

module.exports = {
    crearJornada,
}