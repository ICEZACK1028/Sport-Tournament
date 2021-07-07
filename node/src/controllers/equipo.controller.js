'use strict'
const equipoModel = require('../models/equipo.model');
const jornadaModel = require('../models/jornada.model');
// const { param } = require('../routes/equipo.routes');

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

    equipoModel.find({ligaID: ligaID},(err, equiposEncontrados) => {
        if (err) return res.status(404).send({ mensaje: 'Error al buscar equipo'})
        if (!equiposEncontrados) return res.status(404).send({mensaje: '!Equipos'})
        // console.log(equiposEncontrados);

        equipoModel.findOne({nombre: params.nombre, ligaID: ligaID}, (err, encontrarEquipo) =>{
            if (err) return res.status(404).send({ mensaje: 'Error al guardar equipo'})
            if (encontrarEquipo) return res.status(404).send({mensaje: 'Este equipo ya existe'})

            equipo.save((err, guardarEquipo) => {
                if (err) return res.status(404).send({ mensaje: 'Error al guardar'})
                console.log(equiposEncontrados.length);
                if (equiposEncontrados.length >= 1 ){
                    crearJornada(guardarEquipo.ligaID,equiposEncontrados.length)
                }
                
                return res.status(200).send({guardarEquipo})
            })
        })
    })
        
}

function crearJornada(ligaId, cantidadEquipos){

    var jornadaConstructor = new jornadaModel()
    jornadaConstructor.numero = cantidadEquipos;
    jornadaConstructor.nombre = "Jornada "+jornadaConstructor.numero;
    jornadaConstructor.liga = ligaId;
    jornadaConstructor.games = []

    jornadaConstructor.save()
}

function editarEquipo(req, res){
    var params = req.body
    var equipoID = req.params.equipoID

    equipoModel.findOneAndUpdate({_id: equipoID}, {nombre: params.nombre, imagen: params.imagen},
     {new: true, useFindAndModify: false}, (err, equipoActualizado) => {
         if (err) return res.status(200).send({mensaje: 'Error al actualizar el equipo'})
         return res.status(200).send({equipoActualizado})
     }   
        )
}

function eliminarEquipo(req, res){
    var equipoID = req.params.equipoID

    equipoModel.findOneAndDelete({_id: equipoID}, (err, equipoEliminado) =>{
        if (err) return res.status(404).send({mensaje: 'Error al eliminar el equipo'})
        return res.status(200).send({mensaje:'El equipo se ha eliminado con éxito'})
    })
}

function obtenerEquipoID(req, res){
    var equipoID = req.params.equipoID
    equipoModel.findById(equipoID, (err, equipoEncontrado)=>{
        if(err) return res.status(404).send({mensaje: 'Error al obtener los equipos'})
        if (!equipoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos' })
        return res.status(200).send({equipoEncontrado})
    })

}

function obtenerEquipos(req,res){
    equipoModel.find((err, encontrarEquipos)=>{
        if(err) return res.status(404).send({ mensaje: 'Error al obtener los equipos'});
        if(!encontrarEquipos) return res.status(404).send({ mensaje: 'Error al obtener los datos'});
        return res.status(200).send({ mensaje:'Equipos Registrados', encontrarEquipos})
    })
}

function obtenerEquiposLiga(req, res){
    var ligaID = req.params.ligaID
    equiposModel.find({ligaID:ligaID}, (err, encontrarEquipos)=>{
        if(err) return res.status(404).send({ mensaje: 'Error al obtener los equipos'});
        if(!encontrarEquipos) return res.status(404).send({ mensaje: 'Error al obtener los datos'});
        return res.status(200).send({ mensaje:'Equipos Registrados', encontrarEquipos})
    })
}

module.exports = {
    registrarEquipo,
    editarEquipo,
    eliminarEquipo,
    obtenerEquipoID,
    obtenerEquipos,
    obtenerEquiposLiga
}