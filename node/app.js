'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//Rutas 
const usuario_rutas= require('./src/routes/usuario.routes');
const liga_rutas= require('./src/routes/liga.routes');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Carga de Rutas
app.use('/api', usuario_rutas, liga_rutas );

//Exportación
module.exports = app;