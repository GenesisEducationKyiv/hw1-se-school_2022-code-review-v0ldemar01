
import { Logger, pino } from 'pino';

const initLogger = (): Logger => {
  return pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  });
};

const logger = initLogger();

export { logger };
