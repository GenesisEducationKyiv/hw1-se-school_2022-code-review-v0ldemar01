import { AmqpQueue } from '../common/enums/enums.js';
import { ENV } from '../configs/env.config.js';
import { Amqp } from './amqp/amqp.service.js';
import { initAmqpConnectService } from './amqp/amqp-connect.service.js';
import { Customer } from './customer/customer.service.js';
import { initRepositories } from '../data/repositories/repositories.js';

interface IInitServicesReturn {
  amqp: Amqp;
  customer: Customer;
}

const initServices = async (repositories: ReturnType<typeof initRepositories>): Promise<IInitServicesReturn> => {
  const { customer: customerRepository } = repositories;

  const amqp = await initAmqpConnectService({
    amqpUrl: ENV.RABBITMQ.URL,
    queues: [AmqpQueue.CUSTOMERS, AmqpQueue.CUSTOMERS_REPLY],
  });

  const customer = new Customer({
    amqpClient: amqp,
    customerRepository,
  });

  return { amqp, customer };
};

export { initServices };
