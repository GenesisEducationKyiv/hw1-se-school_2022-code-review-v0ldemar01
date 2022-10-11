import { AmqpQueue } from './common/enums/enums.js';
import { logger } from './services/logger/logger.js';
import { initServices } from './services/services.js';

(async (): Promise<void> => {
  const { amqp } = await initServices();

  logger.info('Connect to RabbitMQ success!');

  amqp.consume({
    queue: AmqpQueue.ERROR_LOGS,
    onMessage: (data: Buffer) => logger.error(JSON.parse(data.toString('utf-8'))),
  });
})();