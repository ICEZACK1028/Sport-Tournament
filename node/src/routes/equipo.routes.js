'use strict'
const express = require('express')
const equipoController = require('../controllers/equipo.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()

api.put('/editarEquipo/:equipoID', md_autenticacion.ensureAuth, equipoController.editarEquipo);
api.post('/registrarEquipo/:ligaID',md_autenticacion.ensureAuth, equipoController.registrarEquipo);
api.get('/obtenerEquipoID/:equipoID',equipoController.obtenerEquipoID);
api.get('/obtenerEquipos', equipoController.obtenerEquipos);
api.get('/obtenerEquiposLiga/:idLiga', equipoController.obtenerEquiposLiga)
api.delete('/eliminarEquipo/:equipoID', md_autenticacion.ensureAuth, equipoController.eliminarEquipo);
api.get('/crearTabla/:idLiga', equipoController.crearTabla)

module.exports = api