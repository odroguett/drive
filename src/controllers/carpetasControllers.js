const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Carpetas = require("../casoUso/casoUso.carpetas");
const router = express.Router();
const boom = require('@hapi/boom')
const logger = require('../../src/logger/logger');
const validador = require('../middleware/validador');
const autorizacion = require('../middleware/auth');
const {carpetaSchema} = require('../OTD/validadores/joiCarpetas');
const multer = require('../middleware/multer');

carpetas = new Carpetas();


router.get("/obtenerListaCarpetas", autorizacion, async (req, res, next) => {

    try {
        const respuesta = await carpetas.buscarListaCarpetas();
        if (respuesta === undefined) {
            throw boom.notFound('No existen Carpetas');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.get("/obtenerCarpeta", autorizacion, async (req, res, next) => {
    try {
        let id = req.query.id;

        const respuesta = null || await carpetas.buscarCarpetas(id);
        console.log(respuesta);

        if (respuesta === null) {
            throw boom.notFound("Error al obtener Carpeta");
        } else {
            res.status(200).json(respuesta);
        }

    } catch (error) {
        logger.info(error);
        next(error);
    }

});

router.post("/crearCarpeta", autorizacion,  async (req, res, next) => {
    const datos = req.body;
   
    const respuesta = await carpetas.agregarCarpeta(datos);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear Carpeta');
    } else {
        res.status(200).json(respuesta);
    }
});

router.delete("/eliminarCarpeta", autorizacion, async (req, res, next) => {
    try {
        const id = req.query.id;
        const respuesta = await carpetas.eliminarCarpeta(id);
        if (respuesta === undefined) {
            throw boom.notFound('Carpeta no encontrada');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }
});

router.patch("/actualizarCarpeta", async (req, res, next) => {
    const id = req.query.id;
    const data = req.body;
    console.log(req.query.id);
    console.log(data);
    if (id === undefined) {
        throw boom.notFound('Falta ingresar id');
    }
    const respuesta = await carpetas.actualizarCarpeta(id, data);
    if (respuesta === undefined) {
        throw boom.notFound('Carpeta no encontrada');
    } else {
        
        res.status(200).json(respuesta);
    }
});

router.post("/subir", autorizacion,multer.single("archivo") ,async (req, res, next) => {
  
    const datos = req.body;
    const nombreArchivo = req.file.filename;
    const json = JSON.parse(datos.objectJSON);
    json.nombre = nombreArchivo;
    json.link = nombreArchivo;
    
    const respuesta = await carpetas.agregarArchivoCarpeta(json);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear Carpeta');
    } else {
        res.status(200).json(respuesta);
    }
  });
  
  router.post("/subirArchivos",autorizacion,multer.array("archivos",10),async (req, res, next) => {
    const datos = req.body;
    const nombreArchivo = req.file.filename;
    console.log(nombreArchivo);
     await res.send("single file upload");
  });
  
  

module.exports =router;