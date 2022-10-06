import { Channel, connect } from 'amqplib';
import {
  IAmqpPublish,
  IAmqpAssertExchange,
} from '../../common/model-types/model-types.js';

interface IAmqpServiceConstructor {
  amqpChannel: Channel;
}

interface IAmqpServiceCreateInstance {
  amqpUrl: string;
}

class Amqp {
  #amqpChannel: Channel;

  constructor({ amqpChannel }: IAmqpServiceConstructor) {
    this.#amqpChannel = amqpChannel;
  }

  static async createInstance({ amqpUrl }: IAmqpServiceCreateInstance): Promise<Amqp> {
    const connection = await connect(amqpUrl, 'heartbeat=60');

    const amqpChannel = await connection.createChannel();
    return new Amqp({ amqpChannel });
  }

  connect(channel: Channel): void {
    this.#amqpChannel = channel;
  }

  async assertExchange({
    exchange,
    type = 'direct',
    options = { durable: true },
  }: Partial<IAmqpAssertExchange>): Promise<void> {
    await this.#amqpChannel.assertExchange(
      exchange as string,
      type,
      options,
    );
  }

  async publish({ exchange, routingKey, content }: IAmqpPublish): Promise<boolean> {
    return this.#amqpChannel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(content)),
    );
  }
}

export { Amqp };
