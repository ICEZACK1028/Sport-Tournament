'use strict'
const app = require('./app');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const Usuario = require('./src/models/usuario.model')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sportTournament', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    console.log('Conectado a la base de datos Sport Tournament');
    app.listen(3000, function() {
        console.log('Se encuentra corriendo en el puerto 3000');

        var usuarioModel = new Usuario()
        usuarioModel.usuario = "ADMIN"
        var secret = 'deportes123'
        usuarioModel.nombre = "ADMIN";
        usuarioModel.apellido = "";
        usuarioModel.direccion = "ADMIN";
        usuarioModel.telefono = "N/A";
        usuarioModel.correo = "ADMIN";
        usuarioModel.imagen = "https://static.wikia.nocookie.net/new-fantendo/images/2/24/Soy_Admin.jpg/revision/latest/scale-to-width-down/720?cb=20200728204122&path-prefix=es";
        usuarioModel.rol = 'ROL_ADMIN'

        Usuario.find({ usuario: usuarioModel.usuario }).exec((err, usuarioEncontrado) => {
            if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return console.log('El usuario Administrador ya fue creado');
            } else {
                bcrypt.hash(secret, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar usuario' })
                        if (usuarioGuardado) {
                            return console.log(usuarioGuardado);
                        } else {
                            return console.log('No se ha podido guardar el usuario');
                        }
                    })
                })
            }
        })
    })

}).catch(err => console.log(err))
