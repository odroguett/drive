const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Institucion = require("../casoUso/casosUso.instituciones");
const router = express.Router();
const boom = require('@hapi/boom')
const logger = require('../../src/logger/logger');
const validador = require('../middleware/validador');
const autorizacion = require('../middleware/auth');
const {institucionSchema} = require('../OTD/validadores/joiInstituciones');

institucion = new Institucion();


router.get("/obtenerListaInstituciones", autorizacion, async (req, res, next) => {

    try {
        const respuesta = await institucion.buscarListaInstituciones();
        if (respuesta === undefined) {
            throw boom.notFound('No existen Instituciones');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.get("/obtenerInstitucion", autorizacion, async (req, res, next) => {
    try {
        let id = req.query.id;

        const respuesta = null || await institucion.buscarInstitucion(id);
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

router.post("/crearInstitucion", autorizacion, validador(institucionSchema, 'body'), async (req, res, next) => {
    const datos = req.body;
    console.log(datos);
    const respuesta = await institucion.agregarInstitucion(datos);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear usuario');
    } else {
        res.status(200).json("Exito");
    }
});

router.delete("/eliminarInstitucion", autorizacion, async (req, res, next) => {
    try {
        const id = req.query.id;
        const respuesta = await institucion.eliminarInstitucion(id);
        if (respuesta === undefined) {
            throw boom.notFound('Institucion no encontrada');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }
});

router.patch("/actualizarInstitucion", async (req, res, next) => {
    const id = req.query.id;
    const data = req.body;
    console.log(req.query.id);
    console.log(data);
    if (id === undefined) {
        throw boom.notFound('Falta ingresar id');
    }
    const respuesta = await institucion.actualizarInstitucion(id, data);
    if (respuesta === undefined) {
        throw boom.notFound('Institucion no encontrada');
    } else {
        
        res.status(200).json(respuesta);
    }
});

module.exports =router;