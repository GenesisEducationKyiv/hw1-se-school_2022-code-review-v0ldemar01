import { AmqpQueue } from './common/enums/enums.js';
import { initRepositories } from './data/repositories/repositories.js';
import { initServices } from './services/services.js';

(async (): Promise<void> => {
  const repositories = initRepositories();
  const { amqp, customer } = await initServices(repositories);

  amqp.consume({
    queue: AmqpQueue.CUSTOMERS,
    onMessage: (data: Buffer) => customer.createCustomer(JSON.parse(data.toString('utf-8'))),
  });

  // amqp.consume({
  //   queue: AmqpQueue.CUSTOMERS_REPLY,
  //   onMessage: (data: Buffer) => console.log(JSON.parse(data.toString('utf-8'))),
  // });
})();