'use strict'
const express = require('express')
const jornadaController = require('../controllers/jornada.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()
api.post('/iniciarLiga/:ligaId', jornadaController.iniciarLiga);
api.get('/obtenerJornadaPorLiga/:ligaId', jornadaController.obtenerJornadaPorLiga);

module.exports = api