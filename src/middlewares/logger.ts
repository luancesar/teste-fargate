import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = `${logDir}/log-api.log`;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      info =>
        `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.File({ filename })],
  exitOnError: false,
});

// logger.stream = {
//   write: (message: string) => {
//     return logger.info(message);
//   },
// };

export default logger;
