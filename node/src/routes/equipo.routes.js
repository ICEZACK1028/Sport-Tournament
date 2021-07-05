'use strict'
const express = require('express')
const equipoController = require('../controllers/equipo.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()

api.post('/registrarEquipo', md_autenticacion.ensureAuth, equipoController.registrarEquipo);

module.exports = api