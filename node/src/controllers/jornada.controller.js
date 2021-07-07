'use strict'
const jornadaModel = require('../models/jornada.model');
const equipoModel = require('../models/equipo.model');

function crearJornada(req, res) {
    var jornadaConstructor = new jornadaModel();
    var ligaId = req.params.ligaId;
    var params = req.body;

    jornadaConstructor.nombre = params.nombre;
    jornadaConstructor.liga = ligaId;
    jornadaConstructor.games = [];

    equipoModel.find({ ligaID: ligaId }, (err, equipoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error al encontrar equipos" });
        if (equipoEncontrado) {

            for (var i = 0; i < equipoEncontrado.length; i++) {
                for (let j = 0; j < equipoEncontrado.length; j++) {

                    if (i != j) {
                        if (i > j) {
                            console.log(i + "  vs   " + j)
                        }

                    }

                }
            }
        }

        /* jornadaModel.find({nombre: params.nombre},(err,jornadaEncontrada) => {
            console.log(jornadaEncontrada);
            if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
            if (jornadaEncontrada) return res.status(500).send({mensaje: 'Está jornada ya existe'});
    
            jornadaConstructor.save((err, jornadaGuardada) => {
                console.log(jornadaGuardada);
                if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
                return res.status(200).send({jornadaGuardada})
            })
        }) */

    })
}

// function crearJornada (req, res) {
//     var jornadaConstructor = new jornadaModel()
//     var ligaId = req.params.ligaId;
//     var params = req.body;

//     jornadaConstructor.nombre = params.nombre;
//     jornadaConstructor.liga = ligaId;
//     jornadaConstructor.games = [{}]

//     jornadaModel.findOne({nombre: params.nombre, liga: ligaId},(err,jornadaEncontrada) => {
//         if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
//         if (jornadaEncontrada) return res.status(500).send({mensaje: 'Está jornada ya existe'});

//         jornadaConstructor.save((err, jornadaGuardada) => {
//             if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
//             return res.status(200).send({jornadaGuardada});
//         })
//     })
// } 

function iniciarLiga(req, res) {
    var jornadaConstructor = new jornadaModel();
    var ligaId = req.params.ligaId;

    equipoModel.find({ ligaID: ligaId }, (err, equipoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Ha ocurrido un error' });
        if(!equipoEncontrado) return res.status(500).send({ mensaje: 'No se han encontrado equipos' });

        var numJornadas = equipoEncontrado.length - 1;
        var numPartidoPorJornada = (equipoEncontrado.length / 2);

        

        // jornadaConstructor.numero = i + 1
        for (let i = 0; i < numJornadas; i++) {
            jornadaConstructor.nombre = "";
            jornadaConstructor.liga = "";
            jornadaConstructor.games = [];
            
            jornadaConstructor.save((err, jornadaGuardada) => {
                return console.log(err)
                if (err) return res.status(200).send({ mensaje: 'Error al guardar jornada' })
                if (!jornadaGuardada) return res.status(200).send({ mensaje: 'Jornada Vacia' })

                res.status(200).send({ jornadaGuardada })
                // for (let j = 0; j < array.length; j++) {
                // }
            })
        }
    })


}

module.exports = {
    crearJornada,
    iniciarLiga
}