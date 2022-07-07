const bcrypt = require("bcrypt");

class Utilidades
{

    static compararValoresEncriptacion(valor1,valor2)
    {
       return bcrypt.compare(valor1, valor2)

    }
}
module.exports = Utilidades;