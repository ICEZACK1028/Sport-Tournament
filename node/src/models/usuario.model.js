const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    correo: String,
    password: String,
    rol: String,
    imagen: String,
})

module.exports = mongoose.model('usuarios', UsuarioSchema);