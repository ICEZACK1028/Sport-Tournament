'use strict';

//Importaciones
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secretPassword';

exports.createToken = function (usuario){
    var payload={
        sub: usuario._id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        correo: usuario.correo,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}
