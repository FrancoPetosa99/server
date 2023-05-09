import winston from 'winston';


const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'path to file',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
});


const addLogger = (request, response, next)=> {
    request.logger = logger;
    request.logger.http(`${request.method} in ${request.url} - ${new Date().toLocaleTimeString()}`);
    next();
}

export default addLogger;