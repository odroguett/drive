const objetoRespuesta = require("../OTD/respuesta");
const baseDatos = require("../entidades/baseDatosSuperFabrica");
const constantes = require("../entidades/entidadesBase/constantes");
//const carpetasOtd = require("../OTD/carpetasOtd");
const utilidades = require("../entidades/entidadesBase/utilidades");
//const {date} = require("joi");
const respuesta = require("../OTD/respuesta");
const config = require("../variablesEntorno/config")
const logger = require('../logger/logger');
const fs = require('fs');

// #region "Carga base de datos"
var DB = new baseDatos();
const modelo = DB.conexionBaseDatos(constantes.MONGO_DB);
const archivos = modelo.crearModelo(constantes.MODELO_ARCHIVOS);
// #endregion

class Archivos {

    agregarArchivo = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            
            const respuesta = await archivos.agregarArchivo(data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Archivo ingresada con exito";
            oRespuesta.objeto = respuesta;
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    buscarArchivos= async (idCarpeta) => {
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "lista de archivos obtenidas con exito";
            oRespuesta.objeto = await archivos.buscarArchivos(idCarpeta);
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen carpetas ingresadas";
        }
    };
    
}
module.exports =Archivos;
