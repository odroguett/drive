const modeloUsuario = require("./usuariosFaker");
const constantes = require("../entidadesBase/constantes");

class fabricaFaker {
  crearModelo(modelo) {
    switch (modelo) {
      case constantes.MODELO_USUARIO:
        return new modeloUsuario();

      default:
        break;
    }
  }
}

module.exports = fabricaFaker;
