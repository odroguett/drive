const usuariosRutas  = require('../controllers/usuariosCotrollers');
const institucionesRutas  = require('../controllers/institucionControllers');
const perfilesRutas = require('../controllers/perfilesControllers');
const carpetasRutas = require('../controllers/carpetasControllers');

function routerApi(app)
{
const api ='/api';
app.use(api + '/usuarios',usuariosRutas);
app.use(api + '/instituciones',institucionesRutas);
app.use(api + '/perfiles',perfilesRutas);
app.use(api + '/carpetas',carpetasRutas);

}
module.exports = routerApi;

