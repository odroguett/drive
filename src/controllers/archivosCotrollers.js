const express = require("express");
const router = express.Router();
const boom = require('@hapi/boom');
const logger = require('../../src/logger/logger');
const autorizacion = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post("/subir", autorizacion,multer.single("archivo") ,async (req, res, next) => {
  
  //let nombre = JSON.parse(datos.objectJSON);
  console.log(req.file.filename);

   await res.send("single file upload");
});

router.post("/subirArchivos",autorizacion,multer.array("archivos",10),async (req, res, next) => {
  const datos = req.body;

   await res.send("single file upload");
});


module.exports = router;