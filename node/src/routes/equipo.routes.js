'use strict'
const express = require('express')
const equipoController = require('../controllers/equipo.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()

api.put('/editarEquipo/:equipoID', md_autenticacion.ensureAuth, equipoController.editarEquipo);
api.post('/registrarEquipo/:ligaID',  equipoController.registrarEquipo);
api.get('/obtenerEquipoID/:equipoID', md_autenticacion.ensureAuth, equipoController.obtenerEquipoID);
api.get('/obtenerEquipos', equipoController.obtenerEquipos);
api.get('/obtenerEquiposLiga/:ligaID', md_autenticacion.ensureAuth, equipoController.obtenerEquiposLiga)
api.delete('/eliminarEquipo/:equipoID', md_autenticacion.ensureAuth, equipoController.eliminarEquipo);
module.exports = api