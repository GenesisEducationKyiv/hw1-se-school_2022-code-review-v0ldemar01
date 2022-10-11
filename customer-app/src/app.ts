import { AmqpQueue, EventName } from './common/enums/enums.js';
import { initRepositories } from './data/repositories/repositories.js';
import { initServices } from './services/services.js';

(async (): Promise<void> => {
  const repositories = initRepositories();
  const { amqp, customer } = await initServices(repositories);

  amqp.consume({
    queue: AmqpQueue.CUSTOMERS,
    onMessage: (data: Buffer) => {
      const content = JSON.parse(data.toString('utf-8'));
      ({
        [EventName.CREATE_CUSTOMER_PENDING]: () => {
          customer.createCustomer(content.data);
        },
        [EventName.CREATE_CUSTOMER_COMPENSATION_PENDING]: () => {
          customer.removeCustomer(content.data);
        },
      } as Record<EventName, () => Promise<void>>)[content.name as EventName]?.();
    },
  });
})();