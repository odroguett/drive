const constantes = require("./entidadesBase/constantes");
const entidadFabrica = require("./baseDatosMongo/fabricaModelo");
const entidadFabricaFaker = require("./faker/fabricaFaker");
class BaseDatosSuperFabrica {
  constructor() {}
  conexionBaseDatos = (tipoBaseDatos) => {
    let usuarios;
    switch (tipoBaseDatos) {
      case constantes.MONGO_DB:
        //Modelo Mongo DB
        console.log("Estamos en la clase de conexion base de datos");
        return new entidadFabrica();

      case constantes.FAKER:
      //Modelo otra BD
      return new entidadFabricaFaker();
    }
  };
}

module.exports = BaseDatosSuperFabrica;
