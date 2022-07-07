const constantes = require("./entidadesBase/constantes");
const entidadFabrica = require("./baseDatosMongo/fabricaModelo");
class BaseDatosSuperFabrica {
  constructor() {}
  conexionBaseDatos = (tipoBaseDatos) => {
    let usuarios;
    switch (tipoBaseDatos) {
      case "MongoDB":
        //Modelo Mongo DB
        console.log("Estamos en la clase de conexion base de datos");
        return new entidadFabrica();

      case "OTRA":
      //Modelo otra BD
    }
  };
}

module.exports = BaseDatosSuperFabrica;
