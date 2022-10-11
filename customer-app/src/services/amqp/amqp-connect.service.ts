
import { AmqpQueue } from '../../common/enums/enums.js';
import { Amqp } from './amqp.service.js';

const initAmqpConnectService = async ({
  amqpUrl,
  queues,
}: {
  amqpUrl: string;
  queues: AmqpQueue[];
}): Promise<Amqp> => {
  const amqp = await Amqp.createInstance({
    amqpUrl,
  });
  for (const queue of queues) {
    await amqp.assertQueue({ queue });
  }

  return amqp;
};

export { initAmqpConnectService };