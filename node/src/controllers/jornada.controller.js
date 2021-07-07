'use strict'
const jornadaModel = require('../models/jornada.model');
const equipoModel = require('../models/equipo.model');

function crearJornada(req,res){
    var jornadaConstructor = new jornadaModel();
    var ligaId = req.params.ligaId;
    var params = req.body;

    jornadaConstructor.nombre = params.nombre;
    jornadaConstructor.liga = ligaId;
    jornadaConstructor.games = [];
    
    equipoModel.find({ligaID: ligaId}, (err, equipoEncontrado) => {
        if(err) return res.status(500).send({mensaje: "Error al encontrar equipos"});
        if(equipoEncontrado) {
            console.log(equipoEncontrado.length);
            
            for ( var i = 0; i < equipoEncontrado.length ; i++ ) {
                for (let j = 0; j < equipoEncontrado.length; j++) {
                    
                    if(i != j){
                        if(i>j){
                     console.log(i + "  vs   " +  j)       
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

/* function crearJornada (req, res) {
    var jornadaConstructor = new jornadaModel()
    var ligaId = req.params.ligaId;
    var params = req.body;
    
    jornadaConstructor.nombre = params.nombre;
    jornadaConstructor.liga = ligaId;
    jornadaConstructor.games = [{}]

    jornadaModel.findOne({nombre: params.nombre, liga: ligaId},(err,jornadaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
        if (jornadaEncontrada) return res.status(500).send({mensaje: 'Está jornada ya existe'});

        jornadaConstructor.save((err, jornadaGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error al guardar la jornada' });
            return res.status(200).send({jornadaGuardada});
        })
    })
} */

module.exports = {
    crearJornada,
}