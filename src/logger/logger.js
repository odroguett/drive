const createLogger = require('winston');

const logger = createLogger.createLogger({
    level: 'info',
    transports: [
        new createLogger.transports.Console(
            {
                level: 'info',
                format: createLogger.format.combine(createLogger.format.simple())
            }
        ),
        new createLogger.transports.File(
            {filename: `${__dirname}/logs/api.log`, maxsize: 512000, maxFiles: 5}
        )
    ]
});


module.exports = logger;
