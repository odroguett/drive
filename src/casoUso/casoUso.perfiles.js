const objetoRespuesta = require("../OTD/respuesta");
const baseDatos = require("../entidades/baseDatosSuperFabrica");
const constantes = require("../entidades/entidadesBase/constantes");
const perfilesOtd = require("../OTD/perfilesOtd");
const utilidades = require("../entidades/entidadesBase/utilidades");
const {date} = require("joi");
const respuesta = require("../OTD/respuesta");
const config = require("../variablesEntorno/config")
const logger = require('../logger/logger');

// #region "Carga base de datos"
var DB = new baseDatos();
const modelo = DB.conexionBaseDatos(constantes.MONGO_DB);
const perfiles = modelo.crearModelo(constantes.MODELO_PERFILES);
// #endregion

class Perfiles {

    buscarListaPerfiles= async () => {
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "lista de perfiles obtenidas con exito";
            oRespuesta.objeto = await perfiles.buscarTodos();
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen perfiles ingresadas";
        }
    };

    buscarPerfil = async (id) => {

        let oRespuesta = objetoRespuesta;
        try {
            if (id === undefined) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe institucion";
                return oRespuesta;
            }
            oRespuesta.objeto = await perfiles.buscar(id);

            if (oRespuesta.objeto != null && oRespuesta.objeto != undefined && oRespuesta.objeto.length > 0) {
                oRespuesta.esValido = true;
                oRespuesta.mensaje = "Institucion obtenido con exito";
                return oRespuesta;
            } else {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe institucion";
                return oRespuesta;
            }
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "Error al obtener institucion";
            return oRespuesta;
        }
    };

   
    agregarPerfil = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await perfiles.agregar(data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Perfil ingresada con exito";
            oRespuesta.objeto = respuesta;
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };
    eliminarPerfil = async (id) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await perfiles.eliminar(id);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Perfil eliminado con exito";
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    actualizarPerfil = async (id, data) => {
        let oRespuesta = objetoRespuesta;
        try {
            let encontrarUsuario = await perfiles.buscar(data.nombre);
           
            if (encontrarUsuario === null) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe Perfil para actualizar";
                return oRespuesta;
            }
         
            const respuesta = await perfiles.actualizar(id, data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Perfil actualizado con exito";
            oRespuesta.objeto = data;
            return oRespuesta;
            
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports =Perfiles;
