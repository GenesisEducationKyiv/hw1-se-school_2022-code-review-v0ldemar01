import { Channel, connect } from 'amqplib';
import {
  IAmqpPublish,
  IAmqpAssertExchange,
  IAmqpSendToQueue,
  IAmqpAssertQueue,
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

  async assertQueue({
    queue,
    options = { exclusive: false },
  }: IAmqpAssertQueue): Promise<void> {
    await this.#amqpChannel.assertQueue(
      queue as string,
      options,
    );
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

  async sendToQueue({ queue, content }: IAmqpSendToQueue): Promise<boolean> {
    return this.#amqpChannel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(content)),
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
