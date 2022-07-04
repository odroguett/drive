
const routes = require ('./src/routes/routes')
const express = require('express');
const config = require('./src/entidades/variablesEntorno/config');
const conexionBD = require('./src/baseDatos/conexionBD')

// Constants
const PORT = config.PORT;
const HOST = config.HOST;
const app = express();

app.use(express.json());

conexionBD();

routes(app);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);