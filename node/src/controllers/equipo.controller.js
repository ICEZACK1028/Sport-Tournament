'use strict'
const equipoModel = require('../models/equipo.model');
const jornadaModel = require('../models/jornada.model');

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
        if (equiposEncontrados.length >= 10){
            return res.status(404).send({mensaje: 'Solo puedes ingresar 10 equipos'})
         }

        equipoModel.findOne({nombre: params.nombre, ligaID: ligaID}, (err, encontrarEquipo) =>{
            if (err) return res.status(404).send({ mensaje: 'Error al guardar equipo'})
            if (encontrarEquipo) return res.status(404).send({mensaje: 'Este equipo ya existe'})

            equipo.save((err, guardarEquipo) => {
                if (err) return res.status(404).send({ mensaje: 'Error al guardar'})
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
    var cantidadEquipos
    var idLiga

    equipoModel.find({},(err, equiposEncontrados)=> {
        if (err) return res.status(404).send({mensaje: 'Error al buscar equipos'})
        if (!equiposEncontrados) return res.status(500).send({mensaje:'No existe ningun equipo'})
        
        cantidadEquipos = equiposEncontrados.length

        if(cantidadEquipos <= 1){
            equipoModel.findOneAndDelete({_id: equipoID}, (err, equipoEliminado) =>{
                if (err) return res.status(404).send({mensaje: 'Error al eliminar el equipo'})
                if (!equipoEliminado) return res.status(404).send({mensaje: 'Equipo Vacio'})
    
               return res.status(200).send({mensaje:'El equipo se ha eliminado con éxito'})
            })
        }else{
            var jornadaEliminar = cantidadEquipos-1
            idLiga = equiposEncontrados[0].ligaID

            equipoModel.findOneAndDelete({_id: equipoID}, (err, equipoEliminado) =>{
                if (err) return res.status(404).send({mensaje: 'Error al eliminar el equipo'})
                if (!equipoEliminado) return res.status(404).send({mensaje: 'Equipo Vacio'})
    
                jornadaModel.findOneAndDelete({numero: jornadaEliminar, liga: idLiga},(err, jornadaEliminada)=> {
                    if (err) return res.status(500).send({mensaje:'Error al eliminar la liga'})
                })
               return res.status(200).send({mensaje:'El equipo se ha eliminado con éxito'})
            })
        }

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
    equipoModel.find({},(err, encontrarEquipos)=>{
        if(err) return res.status(404).send({ mensaje: 'Error al obtener los equipos'});
        if(!encontrarEquipos) return res.status(404).send({ mensaje: 'Error al obtener los datos'});
        return res.status(200).send({encontrarEquipos})
    })
}

function obtenerEquiposLiga(req, res){
    var idLiga = req.params.idLiga
    equipoModel.find({ligaID:idLiga}, (err, equiposEncontrados)=>{
        if(err) return res.status(404).send({ mensaje: 'Error al obtener los equipos'});
        if(!equiposEncontrados) return res.status(404).send({ mensaje: 'Error al obtener los datos'});
        return res.status(200).send({equiposEncontrados})
    }).sort({"PT": -1, "GF": -1})
}

function crearTabla(req,res){
    var ligaId = req.params.idLiga

    jornadaModel.find({liga: ligaId},(err,jornadaEncontrada)=>{

        for (let x = 0; x < jornadaEncontrada.length; x++) {
            for (let i = 0; i < jornadaEncontrada[x].games.length; i++) {
                var GF1 = jornadaEncontrada[x].games[i].goles1
                var GF2 = jornadaEncontrada[x].games[i].goles2
                var difGol = jornadaEncontrada[x].games[i].goles1 - jornadaEncontrada[x].games[i].goles2

                if(jornadaEncontrada[x].games[i].goles1 > jornadaEncontrada[x].games[i].goles2){
                    //GANA EL EQUIPO 1
                    equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo1,
                        {$inc:{PJ:1, PG:1, PP:0, PE:0, GF:GF1, GC:GF2, DG: difGol, PT:3}}, {useFindAndModify: false, new: true}, (err, equipo1Encontrado) => {

                        })
                        equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo2,
                            {$inc:{PJ:1, PG:0, PP:1, PE:0, GF:GF2, GC:GF1, DG: -difGol, PT:0}}, {useFindAndModify: false, new: true}, (err, equipo2Encontrado) => {
                        })

                } else if (jornadaEncontrada[x].games[i].goles1 < jornadaEncontrada[x].games[i].goles2) {
                    //GANA EL EQUIPO 2
                    equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo2,
                        {$inc:{PJ:1, PG:1, PP:0, PE:0, GF:GF2, GC:GF1, DG: -difGol, PT:3}}, {useFindAndModify: false, new: true}, (err, equipo2Encontrado) => {
                        })
                        equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo1,
                            {$inc:{PJ:1, PG:0, PP:1, PE:0, GF:GF1, GC:GF2, DG: difGol, PT:0}}, {useFindAndModify: false, new: true}, (err, equipo1Encontrado) => {  
                        })
                } else {
                    //EMPATE
                    equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo1,
                        {$inc:{PJ:1, PG:0, PP:0, PE:1, GF:GF1, GC:GF2, DG: difGol, PT:1}}, {useFindAndModify: false, new: true}, (err, equipo1Encontrado) => {
                        })
                        equipoModel.findByIdAndUpdate(jornadaEncontrada[x].games[i].equipo2,
                            {$inc:{PJ:1, PG:0, PP:0, PE:1, GF:GF2, GC:GF1, DG: -difGol, PT:1}}, {useFindAndModify: false, new: true}, (err, equipo2Encontrado) => {
                        })
                }

                

            }
        }
        if (err) return res.status(500).send({mensaje: "Error al buscar jornada"})
        if (!jornadaEncontrada) return res.status(500).send({mensaje: "Jornada encontrada vacia"})
        return res.status(200).send({jornadaEncontrada});

    })
}



module.exports = {
    registrarEquipo,
    editarEquipo,
    eliminarEquipo,
    obtenerEquipoID,
    obtenerEquipos,
    obtenerEquiposLiga,
    crearTabla
}