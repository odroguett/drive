const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Archivos = require("../casoUso/casoUso.archivos");
const router = express.Router();
const boom = require('@hapi/boom')
const logger = require('../../src/logger/logger');
const validador = require('../middleware/validador');
const autorizacion = require('../middleware/auth');
//const {carpetaSchema} = require('../OTD/validadores/joiCarpetas');
const multer = require('../middleware/multer');
const path = require('path');
archivos = new Archivos();

router.post("/subir", autorizacion,multer.single("archivo") ,async (req, res, next) => {
  
    const datos = req.body;
    const nombreArchivo = req.file.filename;
    const json = JSON.parse(datos.objectJSON);
    //json.nombre = nombreArchivo;
    json.link = nombreArchivo;

    const respuesta = await archivos.agregarArchivo(json);
    if (respuesta === undefined) {
        throw boom.badRequest('Error al crear archivo');
    } else {
        res.status(200).json(respuesta);
    }
  });

   router.get("/obtenerArchivos", autorizacion, async (req, res, next) => {
    try {
        let idCarpeta = req.query.id;
        
        const respuesta = null || await archivos.buscarArchivos(idCarpeta);
        if (respuesta === null) {
            throw boom.notFound("Error al obtener Carpeta");
        } else {
            res.status(200).json(respuesta);
        }

    } catch (error) {
        logger.info(error);
        next(error);
    }
})
    router.get("/descargar", autorizacion, async(req,res,next) =>{
        try {
            let oRespuesta = objetoRespuesta;
            oRespuesta.esValido = true;
            let idArchivo = req.query.id;
            const dirPath = "./archivos/";
            console.log(dirPath + idArchivo)
            res.download(dirPath + idArchivo);
            
           
        } catch (error) {
            logger.info(error);
            next(error);
        }   
    

});

  
  /* router.post("/subirArchivos",autorizacion,multer.array("archivos",10),async (req, res, next) => {
    const datos = req.body;
    const nombreArchivo = req.file.filename;
    console.log(nombreArchivo);
     await res.send("single file upload");
  }); */
  
  


module.exports =router;