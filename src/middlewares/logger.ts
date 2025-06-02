import expressWinston from 'express-winston';
import path from 'path';
import winston from 'winston';

const logDir = path.join(__dirname, '..', 'logs');

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'request.log'),
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});
