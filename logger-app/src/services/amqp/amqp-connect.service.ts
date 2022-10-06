
import {
  AmqpQueue,
  AmqpExchange,
  AmqpRoutingKey,
} from '../../common/enums/enums.js';
import { Amqp } from './amqp.service.js';

const initAmqpConnectService = async ({
  amqpUrl,
  amqpExchange,
  queues,
  routingKeys,
}: {
  amqpUrl: string;
  queues: AmqpQueue[];
  routingKeys: AmqpRoutingKey[];
  amqpExchange: AmqpExchange;
}): Promise<Amqp> => {
  const amqp = await Amqp.createInstance({
    amqpUrl,
  });
  await amqp.assertExchange({ exchange: amqpExchange });

  await Promise.all(queues.map(async (queue, index) => {
    await amqp.assertQueue({ queue });
    return amqp.bindQueue({
      queue,
      routingKey: routingKeys[index],
      exchange: amqpExchange,
    });
  }));

  return amqp;
};

export { initAmqpConnectService };