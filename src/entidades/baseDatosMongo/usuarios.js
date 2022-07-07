const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/usuarioModelo");

class Usuarios extends RepositorioMongoDB {
  retornaModelo() {
    return modelo;
  }
    buscar(patron)
    {
      return modelo.findOne({
        patron,

      });      

    }

}

module.exports = Usuarios;
