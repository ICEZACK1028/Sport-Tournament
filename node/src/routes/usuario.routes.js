'use strict';

//Importaciones
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();

api.post('/registrarUsuario', usuarioController.registrarUsuario);
api.post('/login', usuarioController.login);

//Exportación
module.exports= api;