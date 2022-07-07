const modeloUsuario = require("./usuarios");

class fabricaModelo {
  crearModelo(modelo) {
    switch (modelo) {
      case "USUARIO":
        console.log("Fabrica Usuario");
        return new  modeloUsuario();
        break;

      default:
        break;
    }
  }
}

module.exports = fabricaModelo;
