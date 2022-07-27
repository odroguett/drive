const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const variablesEntorno = require('../../variablesEntorno/config');

class Utilidades {

    static compararValoresEncriptacion(valor1, valor2) {
        console.log(valor1);
        console.log(valor2);

        return bcrypt.compare(valor1, valor2)

    }

    static generarToken(cargaUtil, expiracion) {
        console.log(cargaUtil);
        const llavePrivada = variablesEntorno.LLAVE_PRIVADA;
        return jwt.sign({
            cargaUtil
        }, llavePrivada, {expiresIn: expiracion});

    }

}


module.exports = Utilidades;
