import {
  AmqpQueue,
  AmqpExchange,
  AmqpRoutingKey,
} from '../common/enums/enums.js';
import { ENV } from '../configs/env.config.js';
import { Amqp } from './amqp/amqp.service.js';
import { initAmqpConnectService } from './amqp/amqp-connect.service.js';

interface IInitServicesReturn {
  amqp: Amqp;
}

const initServices = async (): Promise<IInitServicesReturn> => {
  const amqp = await initAmqpConnectService({
    amqpUrl: ENV.RABBITMQ.URL,
    amqpExchange: AmqpExchange.LOGS,
    queues: [AmqpQueue.DEBUG_LOGS, AmqpQueue.INFO_LOGS, AmqpQueue.ERROR_LOGS],
    routingKeys: [AmqpRoutingKey.DEBUG, AmqpRoutingKey.INFO, AmqpRoutingKey.ERROR],
  });

  return { amqp };
};

export { initServices };
