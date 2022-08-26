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

    maximoArchivo = async () =>{
        let numero =0;
        numero = await archivos.maximoArchivo();
        return numero;
    }

    agregarArchivo = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            let arrNumero =[];
            let numero=0;
            arrNumero = await archivos.maximoArchivo();
            console.log(arrNumero)
            if(arrNumero.length===0)
            {
                numero = 1;     

            }
            else
            {
                numero = Number(arrNumero.find(p=> p.numero).numero);
                numero = numero + 1;
            }
            data.numero =numero;
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

    agregarArchivoArray = async (data) => {
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

    eliminarArchivo = async (id) => {
        let oRespuesta = objetoRespuesta;
        try {
            const dirPath = './archivos/'
            let archivo = dirPath + id;
            const respuesta = await archivos.eliminar(id);
            if(oRespuesta.esValido ==true)
            {
                fs.unlinkSync(archivo)
            }
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
    
}
module.exports =Archivos;
