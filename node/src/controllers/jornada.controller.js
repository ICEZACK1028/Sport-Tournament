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
    var ligaId = req.params.ligaId;
    var jornadaConstructor = new jornadaModel()

    var rondas

    equipoModel.find({ ligaID: ligaId }, (err, equiposEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Ha ocurrido un error' });
        if(!equiposEncontrados) return res.status(500).send({ mensaje: 'No se han encontrado equipos' });
        
        var numEquipos = equiposEncontrados.length
        var numJornadas = equiposEncontrados.length - 1;
        var numPartidoPorJornada = (equiposEncontrados.length / 2);

        rondas = create2DArray(numJornadas,numPartidoPorJornada)
//---------------------------------FASE 1---------------------------------//
        for (let i = 0, k = 0; i < numJornadas; i ++){
            for (let j = 0; j < numPartidoPorJornada; j ++){

                var stringTemporal = String(k)
                // console.log(stringTemporal);
                rondas[i][j] = stringTemporal
                // rondas[i][j] = k

                // jornadaModel.findOneAndUpdate({numero: i+1},
                // { $push:{ games: {equipo1: equiposEncontrados[j]._id, goles1: 0}}},
                // {new:true, useFindAndModify: false},(err, jornadaFase1Add) => { })
                
                k ++;
                if (k == numJornadas)
                    k = 0;
            }
        }
        console.log(rondas);

//---------------------------------FASE 2---------------------------------//
        for (let i = 0; i < numJornadas; i ++){
           if (i % 2 == 0){

               var stringTemporal2 = rondas[i][0] + " - " + String(numEquipos -1)
               rondas[i][0]= stringTemporal2;

                console.log(equiposEncontrados[i]._id);

               jornadaModel.findOneAndUpdate({"games._id": equiposEncontrados[i]._id},
                { "games.$.equipo2": equiposEncontrados[numEquipos-1]._id, "games.$.goles2": 0},
                {new:true, useFindAndModify: false},
                (err, jornadaFase2Add) => {
                    console.log(jornadaFase2Add);
                })
               

            //    rondas[i][0]= numEquipos - 1;
           }else{  //----------------------------------else-------------------------

            var stringTemporal3 = rondas[i][0] + " - " + String(numEquipos -1)
            jornadaModel.findOneAndUpdate({numero: i},
                { "games.$.equipo2": equiposEncontrados[numEquipos-1]._id, "games.$.goles2": 0},
                {new:true, useFindAndModify: false},(err, jornadaFase2Add) => {
                    console.log(jornadaFase2Add);
                })
            
               rondas[i][0] = stringTemporal3;
           }
       }
       console.log(rondas);

//---------------------------------FASE 3---------------------------------//

       var equipoMasAlto = numEquipos - 1;
       var equipoImparMasAlto = equipoMasAlto - 1; 

       for (let i = 0, k = equipoImparMasAlto; i < numJornadas; i ++){
           for (let j = 1; j < numPartidoPorJornada; j ++){

                let stringTemporal = String(k)
                // console.log(stringTemporal);
                rondas[i][j] =  rondas [i][j] +' - '+ stringTemporal

            //    rondas[i][j] = k;
               k --;
               if (k == -1)
                   k = equipoImparMasAlto;
           }
       }

    for (let i = 0, k = 0; i < numJornadas; i ++){
           
    for (let j = 0; j < numPartidoPorJornada; j ++){



        // console.log(Number(rondas[i][j].substring(0,1)));
        var equipoIndex = Number(rondas[i][j].substring(0,1))
        // console.log(equiposEncontrados[equipoIndex].nombre);

        jornadaModel.find


        k ++;
        if (k == numJornadas)
        k = 0;
        }
    }

       console.log(rondas);
        return res.status(200).send(rondas)
    })
}

function create2DArray(filas,columnas) {
    var x = new Array(filas);
    for (var i = 0; i < filas; i++) {
        x[i] = new Array(columnas);
    }
    return x;
 }

//  function prueba()

module.exports = {
    crearJornada,
    iniciarLiga
}