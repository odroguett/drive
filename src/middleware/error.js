const logger = require("../logger/logger");

class ErrorMiddleware {
    constructor() {}

    logError = (err, req, res, next) => {
        logger.info(err);
        next(err);

    };

    logErrorHandler = (err, req, res, next) => {
        console.log("herror handler");
        res.status(400).json({message: err.message, stack: err.stack});


    };

    invalidPathHandler = (request, response, next) => {
        response.status(400)
        response.send('Ruta Invalida')
    };

    boomErrorHandler = (err, req, res, next) => {
        if (err.isBoom) {
            const {output} = err;
            res.status(output.statusCode).json(output.payload);
        }
        next(err);
    }

}


module.exports = ErrorMiddleware
