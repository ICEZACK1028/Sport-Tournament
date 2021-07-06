'use strict'
const express = require('express')
const jornadaController = require('../controllers/jornada.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()
api.post('/crearJornada/:ligaId', md_autenticacion.ensureAuth, jornadaController.crearJornada),

module.exports = api