import { Channel, connect } from 'amqplib';
import {
  IAmqpConsume,
  IAmqpBindQueue,
  IAmqpAssertQueue,
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

  async assertExchange({
    exchange,
    type = 'direct',
    options = { durable: true },
  }: IAmqpAssertExchange): Promise<void> {
    await this.#amqpChannel.assertExchange(
      exchange as string,
      type,
      options,
    );
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

  async bindQueue({
    queue,
    exchange,
    routingKey,
  }: IAmqpBindQueue): Promise<void> {
    await this.#amqpChannel.bindQueue(
      queue as string,
      exchange,
      routingKey,
    );
  }

  async consume({
    queue,
    onMessage,
    options = { noAck: false },
  }: IAmqpConsume): Promise<void> {
    await this.#amqpChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          this.#amqpChannel.ack(msg);
          onMessage(msg.content);
        }
      },
      options,
    );
  }
}

export { Amqp };
