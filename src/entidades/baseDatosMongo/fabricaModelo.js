const constantes = require("../entidadesBase/constantes");
const modeloUsuario = require("./usuarios");
const modeloInstituciones = require("./instituciones");
const modeloPerfiles= require("./perfiles");
const modeloCarpetas = require("./carpeta");

class fabricaModelo {
  crearModelo(modelo) {
    switch (modelo) {
      case constantes.MODELO_USUARIO:
        
        return new  modeloUsuario();
        break;
        case constantes.MODELO_INSTITUCIONES:
        
          return new  modeloInstituciones();
          break;

          case constantes.MODELO_PERFILES:
        
            return new  modeloPerfiles();
            break;

            case constantes.MODELO_CARPETAS:
        
            return new  modeloCarpetas();
            break;
      default:
        break;
    }
  }
}

module.exports = fabricaModelo;
