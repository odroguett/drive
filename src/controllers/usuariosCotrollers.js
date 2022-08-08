const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Usuarios = require("../casoUso/casoUso.usuarios");
const router = express.Router();
const boom = require('@hapi/boom')
const logger = require('../../src/logger/logger');
const validador = require('../middleware/validador');
const autorizacion = require('../middleware/auth');
const {usuarioLoginSchema, usuarioSchema} = require('../OTD/validadores/joiUsuarios');

usuarios = new Usuarios();
// Get pruebas
router.get("/", autorizacion, async (req, res, next) => {
    res.status(400).json("Prueba Nodemon");
});


router.get("/obtenerListaUsuarios", autorizacion, async (req, res, next) => {

    try {
        const respuesta = await usuarios.buscarListaUsuario();
        if (respuesta === undefined) {
            throw boom.notFound('No existen usuarios');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.get("/obtenerUsuario", autorizacion, async (req, res, next) => {
    try {
        let usuario = req.query.usuario;

        const respuesta = null || await usuarios.buscarUsuario(usuario);
        console.log(respuesta);

        if (respuesta === null) {
            throw boom.notFound("Error al obtener usuario");
        } else {
            res.status(200).json(respuesta);
        }

    } catch (error) {
        logger.info(error);
        next(error);
    }

});

// POST
router.post("/crearUsuario", autorizacion, validador(usuarioSchema, 'body'), async (req, res, next) => {
    const datos = req.body;
    console.log(datos);
    const respuesta = await usuarios.agregarUsuario(datos);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear usuario');
    } else {
        res.status(200).json("Exito");
    }
});

router.post("/login", async (req, res, next) => {

    console.log(req.body.usuario);
    try {

        const datos = req.body;

        
        let token;
        const respuesta = null || await usuarios.autentificarUsuario(datos.usuario, datos.password);
        token = await usuarios.generarTokenUsuario(datos.usuario);

        if (respuesta != null) {
            res.header('Autorizado', token).json({mensaje: 'Usuario autentificado', token: token})
        } else {
            throw boom.notFound('Usuario no encontrado');

        }

    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.delete("/eliminarUsuario", autorizacion, async (req, res, next) => {
    try {
        const id = req.query.id;
        const respuesta = await usuarios.eliminarUsuario(id);
        if (respuesta === undefined) {
            throw boom.notFound('Usuario no encontrado');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }
});

router.patch("/actualizarUsuario", async (req, res, next) => {
    const id = req.query.id;
    const data = req.body;
    console.log(req.query.id);
    console.log(data);
    if (id === undefined) {
        throw boom.notFound('Falta ingresar id');
    }
    const respuesta = await usuarios.actualizarUsuario(id, data);
    if (respuesta === undefined) {
        throw boom.notFound('Usuario no encontrado');
    } else {
        
        res.status(200).json(respuesta);
    }
});

module.exports = router;
