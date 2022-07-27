const bcrypt = require("bcrypt");
const objetoRespuesta = require("../OTD/respuesta");
const baseDatos = require("../entidades/baseDatosSuperFabrica");
const constantes = require("../entidades/entidadesBase/constantes");
const usuariosOtd = require("../OTD/usuariosOTD");
const utilidades = require("../entidades/entidadesBase/utilidades");
const {date} = require("joi");
const respuesta = require("../OTD/respuesta");
const config = require("../variablesEntorno/config")
const logger = require('../logger/logger');


// #region "Carga base de datos"
var DB = new baseDatos();
const modelo = DB.conexionBaseDatos(constantes.MONGO_DB);
const usuarios = modelo.crearModelo(constantes.MODELO_USUARIO);
// #endregion


class Usuarios {
    constructor() {}

    buscarListaUsuario = async (usuario) => {
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Usuario obtenido con exito";
            oRespuesta.objeto = await usuarios.buscarTodos();
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen usuarios registrados";
        }
    };

    buscarUsuario = async (usuario) => {

        let oRespuesta = objetoRespuesta;
        try {
            if (usuario === undefined) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe usuario";
                return oRespuesta;
            }
            oRespuesta.objeto = await usuarios.buscar(usuario);

            if (oRespuesta.objeto != null && oRespuesta.objeto != undefined && oRespuesta.objeto.length > 0) {
                oRespuesta.esValido = true;
                oRespuesta.mensaje = "Usuario obtenido con exito";
                return oRespuesta;
            } else {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe Usuario";
                return oRespuesta;
            }
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = "No existen usuarios registrados";
            return oRespuesta;
        }
    };

    autentificarUsuario = async (usuario, password) => {
        let oRespuesta = objetoRespuesta;
        try {

            const respuestaUsuario = await usuarios.buscar(usuario);

            const passwordEncriptado = respuestaUsuario.map(p => p.password).shift();

            console.log(passwordEncriptado)
            if (await utilidades.compararValoresEncriptacion(password, passwordEncriptado)) {
                oRespuesta.esValido = true;
                oRespuesta.mensaje = "Usuario autentificado con exito";

                return oRespuesta;
            } else {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "Error al autentificar usuario";

                return oRespuesta;
            }
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    generarTokenUsuario = async (usuario) => {
        let oRespuesta = objetoRespuesta;
        try {
            let token = await utilidades.generarToken(usuario, config.EXPIRACION_TOKEN) || null

            if (token != null) {
                return token

            }

        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }


    }

    agregarUsuario = async (data) => {
        let oRespuesta = objetoRespuesta;
        let password = data.password;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        data.password = hash;

        try {
            const respuesta = await usuarios.agregar(data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Usuario Creado con exito";
            oRespuesta.objeto = respuesta;
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };
    eliminarUsuario = async (id) => {
        let oRespuesta = objetoRespuesta;
        try {
            const respuesta = await usuarios.eliminar(id);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Usuario eliminado con exito";
            return oRespuesta;
        } catch (error) {
            logger.info(error);
            oRespuesta.esValido = false;
            oRespuesta.mensaje = error;
            return oRespuesta;
        }
    };

    actualizarUsuario = async (id, data) => {
        let oRespuesta = objetoRespuesta;
        try {
            let encontrarUsuario = await usuarios.buscar(data.nombre);
           
            if (encontrarUsuario === null) {
                oRespuesta.esValido = false;
                oRespuesta.mensaje = "No existe usuario para actualizar";
                return oRespuesta;
            }
         
            const respuesta = await usuarios.actualizar(id, data);
            oRespuesta.esValido = true;
            oRespuesta.mensaje = "Usuario actualizado con exito";
            oRespuesta.objeto = data;
            return oRespuesta;
            
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = Usuarios;
