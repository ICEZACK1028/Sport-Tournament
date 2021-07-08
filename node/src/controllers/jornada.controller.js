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
    var equipo1
    var equipo2
    var goles1
    var goles2
    var juegos
    var juegosNombres
    var rondas

    equipoModel.find({ ligaID: ligaId }, (err, equiposEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Ha ocurrido un error' });
        if(!equiposEncontrados) return res.status(500).send({ mensaje: 'No se han encontrado equipos' });
        
        var numEquipos = equiposEncontrados.length
        var numJornadas = equiposEncontrados.length - 1;
        var numPartidoPorJornada = (equiposEncontrados.length / 2);

        rondas = create2DArray(numJornadas,numPartidoPorJornada)
        juegos = create2DArray(numJornadas,numPartidoPorJornada)
        juegosNombres = create2DArray(numJornadas,numPartidoPorJornada)

//---------------------------------FASE 1---------------------------------//
        for (let i = 0, k = 0; i < numJornadas; i ++){
            for (let j = 0; j < numPartidoPorJornada; j ++){
                var stringTemporal = String(k)
                rondas[i][j] = stringTemporal
                juegos[i][j] = equiposEncontrados[k]._id
                juegosNombres[i][j] = equiposEncontrados[k].nombre

                k ++;
                if (k == numJornadas)
                    k = 0;
            }
        }

//---------------------------------FASE 2---------------------------------//
        for (let i = 0; i < numJornadas; i ++){
            var stringTemporal2 = rondas[i][0] + " - " + String(numEquipos -1)
            rondas[i][0]= stringTemporal2;
            juegos[i][0] = juegos[i][0] + " - " + equiposEncontrados[numEquipos-1]._id 
            juegosNombres[i][0] = juegosNombres[i][0] + " - " + equiposEncontrados[numEquipos-1].nombre
       }
       
//---------------------------------FASE 3---------------------------------//

       var equipoMasAlto = numEquipos - 1;
       var equipoImparMasAlto = equipoMasAlto - 1; 

       for (let i = 0, k = equipoImparMasAlto; i < numJornadas; i ++){
           for (let j = 1; j < numPartidoPorJornada; j ++){

                let stringTemporal = String(k)
                rondas[i][j] =  rondas [i][j] +' - '+ stringTemporal
                juegos[i][j] =  juegos [i][j] +' - '+ equiposEncontrados[k]._id
                juegosNombres[i][j] =  juegosNombres [i][j] +' - '+ equiposEncontrados[k].nombre

               k --;
               if (k == -1)
                   k = equipoImparMasAlto;
           }
       }

//---------------------------------FASE 4---------------------------------//

       for (let i = 0, k = 0; i < numJornadas; i ++){
        for (let j = 0; j < numPartidoPorJornada; j ++){

            var stringTemporal = String(k)
            var equiposNombre = juegosNombres[i][j]
            var nombre1 = equiposNombre.split(' - ')[0]
            var nombre2Array = equiposNombre.split(' - ')
            var nombre2 = nombre2Array[nombre2Array.length - 1]

            var equipos = juegos[i][j]
            equipo1 = equipos.split(' ')[0]
            var equipo2Array = equipos.split(' ')
            equipo2 = equipo2Array[equipo2Array.length - 1]

            rondas[i][j] = k

            jornadaModel.findOneAndUpdate({numero: i+1},
            { $push:{ games: {equipo1: equipo1,nombre1: nombre1, goles1: 0,
                              equipo2: equipo2,nombre2: nombre2, goles2: 0}}},
            {new:true, useFindAndModify: false},(err, jornadaFase1Add) => { })
            
            k ++;
            if (k == numJornadas)
                k = 0;
        }   
    }
        return res.status(200).send({juegosNombres})
    })
}

function create2DArray(filas,columnas) {
    var x = new Array(filas);
    for (var i = 0; i < filas; i++) {
        x[i] = new Array(columnas);
    }
    return x;
 }



module.exports = {
    crearJornada,
    iniciarLiga
}