import { AmqpExchange } from '../../common/enums/enums.js';
import { Amqp } from './amqp.service.js';

const initAmqpConnectService = async ({
  amqpUrl,
  amqpExchange,
}: {
  amqpUrl: string;
  amqpExchange: AmqpExchange;
}): Promise<Amqp> => {
  const amqp = await Amqp.createInstance({
    amqpUrl,
  });
  await amqp.assertExchange({ exchange: amqpExchange });

  return amqp;
};

export { initAmqpConnectService };