const express = require('express')
const objetoRespuesta = require('../OTD/respuesta')
const router = express.Router()
const boom = require('@hapi/boom')
const logger = require('../logger/logger')
const validador = require('../middleware/validador')
const autorizacion = require('../middleware/auth')
const multer = require('../middleware/multer')
const utilidades = require('../entidades/entidadesBase/utilidades')
const path = require('path')
const archiver = require('archiver')
const fs = require('fs')
const Archivos = require('../casoUso/casoUso.archivos')

archivos = new Archivos()
oUtilidades = new utilidades()

router.post(
  '/subir',
  autorizacion,
  multer.single('archivo'),
  async (req, res, next) => {
    const datos = req.body
    const nombreArchivo = req.file.filename
    const json = JSON.parse(datos.objectJSON)
    json.link = nombreArchivo
    const respuesta = await archivos.agregarArchivo(json)
    if (respuesta === undefined) {
      throw boom.badRequest('Error al crear Carpeta')
    } else {
      res.status(200).json(respuesta)
    }
  },
)

router.post(
  '/subirListaArchivos',
  autorizacion,
  multer.array('archivos'),
  async (req, res, next) => {
    const datos = req.body
    let respuesta
    let arrayArchivos = req.files
    let numero =0;
    let arrNumero = []
    arrNumero = await archivos.maximoArchivo();
    if (arrNumero.length === 0) {
      numero = 1
    } else {
      numero = Number(arrNumero.find((p) => p.numero).numero)
      numero = numero + 1
    }
    const json = JSON.parse(datos.objectJSON)
    console.log(arrayArchivos)
    await arrayArchivos.forEach((element) => {
      json.numero = numero;
      json.link = element.nombre
      respuesta = archivos.agregarArchivoArray(json)
      numero = numero +1;
    })

    if (respuesta === undefined) {
      throw boom.badRequest('Error al crear Carpeta')
    } else {
      res.status(200).json(respuesta)
    }
  },
)

router.get('/obtenerArchivos', autorizacion, async (req, res, next) => {
  try {
    let idCarpeta = req.query.id

    const respuesta = await archivos.buscarArchivos(idCarpeta)
    if (respuesta === undefined) {
      throw boom.badRequest('Error al obtener archivo')
    } else {
      res.status(200).json(respuesta)
    }
  } catch (error) {
    logger.info(error)
    next(error)
  }
})

router.get('/descargar', autorizacion, async (req, res, next) => {
  try {
    const dirPath = './archivos/'
    const dirPathZip = './archivos/zip/'
    let archivo = dirPathZip + 'comprimido.zip'
    let idArchivo = req.query.id
    let writestream = fs.createWriteStream(archivo)
    let archive = archiver('zip')
    archive.pipe(writestream)
    archive.append(fs.createReadStream(dirPath + idArchivo), {
      name: idArchivo,
    })
    writestream.on('close', () => {
      res.download(archivo, () => {
        fs.unlinkSync(archivo)
      })
    })
    archive.finalize()
  } catch (error) {
    logger.info(error)
    next(error)
  }
})

router.delete("/eliminarArchivo", autorizacion, async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log(id);
        const respuesta = await archivos.eliminarArchivo(id);
        if (respuesta === undefined) {
            throw boom.notFound('Archivo No Encontrado');
        } else {
            res.status(200).json(respuesta);
        }
    } catch (error) {
        logger.info(error);
        next(error);
    }
});

module.exports = router
