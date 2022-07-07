const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/usuarioModelo");

class Usuarios extends RepositorioMongoDB {
  retornaModelo() {
    return modelo;
  }
}

module.exports = Usuarios;
