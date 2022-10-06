/* eslint-disable no-console */
import { AmqpQueue } from './common/enums/enums.js';
import { initServices } from './services/services.js';

(async (): Promise<void> => {
  const { amqp } = await initServices();

  amqp.consume({
    queue: AmqpQueue.ERROR_LOGS,
    onMessage: (data: Buffer) => console.log('data', JSON.parse(data.toString('utf-8'))),
  });
})();