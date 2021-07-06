'use strict'
const express = require('express')
const equipoController = require('../controllers/equipo.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router()

api.post('/registrarEquipo/:ligaID',  equipoController.registrarEquipo);

module.exports = api