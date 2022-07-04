
const express = require('express');
const usuariosRutas  = require('../controllers/usuariosCotrollers');
const routes = express.Router();

function routerApi(app)
{
const api ='/api';
app.use(api + '/usuarios',usuariosRutas);
}
module.exports = routerApi;

