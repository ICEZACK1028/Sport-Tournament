'use strict';

//Importaciones
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secretPassword';

function createToken (usuario){
    var payload={
        sub: usuario._id,
        usuario: usuario.usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}

module.exports = createToken; 