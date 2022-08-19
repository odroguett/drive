const constantes = require("../entidadesBase/constantes");
const modeloUsuario = require("./usuarios");
const modeloInstituciones = require("./instituciones");
const modeloPerfiles= require("./perfiles");
const modeloCarpetas = require("./carpeta");
const modeloArchivos=require("./archivos");

class fabricaModelo {
  crearModelo(modelo) {
    switch (modelo) {
      case constantes.MODELO_USUARIO:

        return new  modeloUsuario();
        
      case constantes.MODELO_INSTITUCIONES:

        return new  modeloInstituciones();

      case constantes.MODELO_PERFILES:
        
        return new  modeloPerfiles();

      case constantes.MODELO_CARPETAS:
        
        return new  modeloCarpetas();

      case constantes.MODELO_ARCHIVOS:

        return new  modeloArchivos();
              
      default:
        break;
    }
  }
}

module.exports = fabricaModelo;
