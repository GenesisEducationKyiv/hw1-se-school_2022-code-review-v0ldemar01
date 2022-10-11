import { AmqpExchange, AmqpQueue } from '../../common/enums/enums.js';
import { Amqp } from './amqp.service.js';

const initAmqpConnectService = async ({
  amqpUrl,
  exchange,
  queues,
}: {
  amqpUrl: string;
  queues: AmqpQueue[];
  exchange: AmqpExchange;
}): Promise<Amqp> => {
  const amqp = await Amqp.createInstance({
    amqpUrl,
  });
  await amqp.assertExchange({ exchange });

  for (const queue of queues) {
    await amqp.assertQueue({ queue });
  }
  return amqp;
};

export { initAmqpConnectService };