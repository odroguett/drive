const jwt = require('jsonwebtoken')
const variablesEntorno = require('../variablesEntorno/config');
const boom = require('@hapi/boom')

function autorizacion(req, res, next) {
    const tokenAcceso = req.headers['authorization'] || req.query.token;
    console.log(tokenAcceso);
    let llavePrivada = variablesEntorno.LLAVE_PRIVADA
    if (! tokenAcceso) 
        res.send('Acceso denegado');
    const bearToken = tokenAcceso.split(" ")[1]
    jwt.verify(bearToken, llavePrivada, (err, user) => {
        if (err) {
           throw boom.forbidden('Usuario no autorizado o token expirado');

        } else {
            req.user = user;
            next();
        }
    });

}

module.exports= autorizacion;