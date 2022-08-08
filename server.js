const routes = require('./src/routes/routes')
const express = require('express');
const config = require('./src/variablesEntorno/config');
const conexionBD = require('./src/baseDatos/conexionBD')
const ErrorMiddleware = require('./src/middleware/error');
const logger = require('./src/logger/logger');
const multer = require('./src/middleware/multer');
const cors = require('cors');

// Constantes
const PORT = config.PORT;
const HOST = config.HOST;
const app = express();

const errorMiddleware = new ErrorMiddleware();

app.use(express.json());
app.use(cors());



conexionBD();

routes(app);

app.use(errorMiddleware.logError);
app.use(errorMiddleware.boomErrorHandler);
app.use(errorMiddleware.logErrorHandler);
app.use(errorMiddleware.invalidPathHandler);



app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`)
