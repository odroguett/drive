const express = require("express");
const objetoRespuesta = require("../OTD/respuesta");
const Usuarios = require("../casoUso/casoUso.usuarios");
const router = express.Router();

usuarios = new Usuarios();
//Get pruebas
router.get(
  "/",

  async (req, res, next) => {
    console.log("Cramos Usuario");
    res.status(400).json("Prueba Nodemon");
  }
);

//Get pruebas
router.get(
  "/obtenerListaUsuarios",

  async (req, res, next) => {
    const respuesta = await usuarios.buscarListaUsuario();
    if (respuesta === undefined) {
      res.status(400).json("Error");
    } else {
      res.status(200).json(respuesta);
    }
  }
);

router.get(
  "/obtenerUsuario",
  async (req, res, next) => {
    let usuario = req.query.usuario;
    const respuesta = await usuarios.buscarUsuario(usuario);
    if (respuesta === undefined) {
      res.status(400).json("Error");
    } else {
      res.status(200).json(respuesta);
    }
  }
);

//POST
router.post("/crearUsuario", async (req, res, next) => {
  const datos = req.body;
  console.log(datos);
  const respuesta = await usuarios.agregarUsuario(datos);
  if (respuesta === undefined) {
    res.status(400).json("Error");
  } else {
    res.status(200).json("Exito");
  }
});

router.post("/login", async (req, res, next) => {
    const datos = req.body;
    let oRespuesta = objetoRespuesta;
    oRespuesta = await usuarios.autentificarUsuario(datos.usuario,datos.password);
    console.log(oRespuesta);
    
    if (oRespuesta.esValido === false) {
      res.status(400).json(oRespuesta);
    } else {
      res.status(200).json(oRespuesta);
    }
  });
  

router.delete(
  "/eliminarUsuario",

  async (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    const respuesta = await usuarios.eliminarUsuario(id);
    if (respuesta === undefined) {
      res.status(400).json("Error");
    } else {
      res.status(200).json(respuesta);
    }
  }
);

router.patch(
  "/actualizarUsuario",

  async (req, res, next) => {
    const id = req.query.id;
    const data = req.body;
    console.log(id);
    console.log(data);
    if (id === undefined) {
      res.status(400).json("Falta ingresar id");
    }
    const respuesta = await usuarios.actualizarUsuario(id, data);
    if (respuesta === undefined) {
      res.status(400).json("Error");
    } else {
      res.status(200).json(respuesta);
    }
  }
);

module.exports = router;
