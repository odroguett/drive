const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Perfiles = require("../casoUso/casoUso.perfiles");
const router = express.Router();
const boom = require('@hapi/boom')
const logger = require('../../src/logger/logger');
const validador = require('../middleware/validador');
const autorizacion = require('../middleware/auth');
const {perfilSchema} = require('../OTD/validadores/joinPerfiles');

perfiles = new Perfiles();


router.get("/obtenerListaPerfiles", autorizacion, async (req, res, next) => {

    try {
        const respuesta = await perfiles.buscarListaPerfiles();
        if (respuesta === undefined) {
            throw boom.notFound('No existen Perfiles');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.get("/obtenerPerfil", autorizacion, async (req, res, next) => {
    try {
        let id = req.query.id;

        const respuesta = null || await perfiles.buscarPerfil(id);
        console.log(respuesta);

        if (respuesta === null) {
            throw boom.notFound("Error al obtener Perfil");
        } else {
            res.status(200).json(respuesta);
        }

    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.post("/crearPerfil", autorizacion, validador(perfilSchema, 'body'), async (req, res, next) => {
    const datos = req.body;
    console.log(datos);
    const respuesta = await perfiles.agregarPerfil(datos);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear Perfil');
    } else {
        res.status(200).json("Exito");
    }
});

router.delete("/eliminarPerfil", autorizacion, async (req, res, next) => {
    try {
        const id = req.query.id;
        const respuesta = await perfiles.eliminarPerfil(id);
        if (respuesta === undefined) {
            throw boom.notFound('Perfil no encontrada');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }
});

router.patch("/actualizarPerfil", async (req, res, next) => {
    const id = req.query.id;
    const data = req.body;
    console.log(req.query.id);
    console.log(data);
    if (id === undefined) {
        throw boom.notFound('Falta ingresar id');
    }
    const respuesta = await perfiles.actualizarPerfil(id, data);
    if (respuesta === undefined) {
        throw boom.notFound('Perfil no encontrada');
    } else {
        
        res.status(200).json(respuesta);
    }
});

module.exports =router;