import winston from 'winston'

const LoggerMiddleWare = (req, res, next) => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'log/combined.log' }),
    ],
  });

  const data = {
    method: req.method
  }

  logger.info(data)
  next()
}

export default LoggerMiddleWare