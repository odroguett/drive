const objetoRespuesta = require("../OTD/respuesta");
const baseDatos = require("../entidades/baseDatosSuperFabrica");
const constantes = require("../entidades/entidadesBase/constantes");
const carpetasOtd = require("../OTD/carpetasOtd");
const utilidades = require("../entidades/entidadesBase/utilidades");
const {date} = require("joi");
const respuesta = require("../OTD/respuesta");
const config = require("../variablesEntorno/config")
const logger = require('../logger/logger');

// #region "Carga base de datos"
var DB = new baseDatos();
const modelo = DB.conexionBaseDatos(constantes.MONGO_DB);
const carpetas = modelo.crearModelo(constantes.MODELO_CARPETAS);
// #endregion

class Carpetas {

    buscarListaCarpetas= async () => {
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "lista de carpetas obtenidas con exito";
            oRespuesta.objeto = await carpetas.buscarTodos();
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen carpetas ingresadas";
        }
    };

    buscarCarpetas = async (id) => {

        let oRespuesta = objetoRespuesta;
        try {
            if (id === undefined) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe identificador para carpeta";
                return oRespuesta;
            }
            console.log(id);
            oRespuesta.objeto = await carpetas.buscar(id);

            if (oRespuesta.objeto != null && oRespuesta.objeto != undefined && oRespuesta.objeto.length > 0) {
                oRespuesta.esValido = true;
                oRespuesta.mensaje = "Carpeta obtenido con exito";
                return oRespuesta;
            } else {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe carpeta";
                return oRespuesta;
            }
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "Error al obtener carpeta";
            return oRespuesta;
        }
    };

   
    agregarCarpeta = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await carpetas.agregar(data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "carpeta ingresada con exito";
            oRespuesta.objeto = respuesta;
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };
    
    eliminarCarpeta = async (id) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await carpetas.eliminar(id);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Carpeta eliminado con exito";
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    actualizarCarpeta = async (id, data) => {
        let oRespuesta = objetoRespuesta;
        try {
            let encontrarCarpeta = await carpetas.buscar(id);
            console.log(data)
            console.log(id)
           
            if (encontrarCarpeta === null) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe Carpeta para actualizar";
                return oRespuesta;
            }
         
            const respuesta = await carpetas.actualizar(id, data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Carpeta actualizado con exito";
            oRespuesta.objeto = data;
            return oRespuesta;
            
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    agregarArchivoCarpeta = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            
            const respuesta = await carpetas.agregarArchivo(data);
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
    
}
module.exports =Carpetas;
