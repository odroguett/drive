const objetoRespuesta = require("../OTD/respuesta");
const baseDatos = require("../entidades/baseDatosSuperFabrica");
const constantes = require("../entidades/entidadesBase/constantes");
const institucionesOtd = require("../OTD/institucionesOTD");
const utilidades = require("../entidades/entidadesBase/utilidades");
const {date} = require("joi");
const respuesta = require("../OTD/respuesta");
const config = require("../variablesEntorno/config")
const logger = require('../logger/logger');

// #region "Carga base de datos"
var DB = new baseDatos();
const modelo = DB.conexionBaseDatos(constantes.MONGO_DB);
const instituciones = modelo.crearModelo(constantes.MODELO_INSTITUCIONES);
// #endregion

class Instituciones {

    buscarListaInstituciones = async () => {
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "lista de instituciones obtenidas con exito";
            oRespuesta.objeto = await instituciones.buscarTodos();
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen instituciones ingresadas";
        }
    };

    buscarInstitucion = async (id) => {

        let oRespuesta = objetoRespuesta;
        try {
            if (id === undefined) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe institucion";
                return oRespuesta;
            }
            oRespuesta.objeto = await instituciones.buscar(id);

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

   
    agregarInstitucion = async (data) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await instituciones.agregar(data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Institucion ingresada con exito";
            oRespuesta.objeto = respuesta;
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };
    eliminarInstitucion = async (id) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await instituciones.eliminar(id);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Institucipn eliminado con exito";
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    actualizarInstitucion = async (id, data) => {
        let oRespuesta = objetoRespuesta;
        try {
            let encontrarUsuario = await instituciones.buscar(data.nombre);
           
            if (encontrarUsuario === null) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe institucion para actualizar";
                return oRespuesta;
            }
         
            const respuesta = await instituciones.actualizar(id, data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Institucion actualizado con exito";
            oRespuesta.objeto = data;
            return oRespuesta;
            
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports =Instituciones;
