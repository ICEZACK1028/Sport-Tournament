'use strict';

//Importaciones
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();

api.post('/registrarUsuario', usuarioController.registrarUsuario);
api.put('/agregarAdministrador/:idUsuario', md_authentication.ensureAuth, usuarioController.agregarAdministrador);
api.post('/login', usuarioController.login);
api.put('/editarUsuario/:idUsuario', md_authentication.ensureAuth, usuarioController.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_authentication.ensureAuth, usuarioController.eliminarUsuario);
api.get('/verUsuario/:idUsuario', md_authentication.ensureAuth, usuarioController.verUsuario);
api.get('/listarUsuarios', usuarioController.listarUsuarios);

//Exportación
module.exports= api;