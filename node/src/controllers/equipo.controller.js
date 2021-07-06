'use strict'
const equipoModel = require('../models/equipo.model');

function registrarEquipo(req, res){
    var equipo = new equipoModel()
    var params = req.body;
    var ligaID = req.params.ligaID

    equipo.nombre = params.nombre;
    equipo.imagen = params.imagen;
    equipo.PJ = 0;
    equipo.PG = 0;
    equipo.PP = 0;
    equipo.PE = 0;
    equipo.GF = 0;
    equipo.GC = 0;
    equipo.DG = 0;
    equipo.PT = 0;
    equipo.ligaID = ligaID;

    equipoModel.findOne({nombre: params.nombre}, (err, encontrarEquipo) =>{
        if (err) return res.status(404).send({ mensaje: 'Error al guardar equipo'})
        if (encontrarEquipo) return res.status(404).send({mensaje: 'Este equipo ya existe'})

        equipo.save((err, guardarEquipo) => {
            if (err) return res.status(404).send({ mensaje: 'Error al guardar'})
            return res.status(200).send({guardarEquipo})
        })
    })
}

function editarEquipo(req, res){

}

function eliminarEquipo(req, res){

}

function obtenerEquipo(req, res){

}


module.exports = {
    registrarEquipo
}