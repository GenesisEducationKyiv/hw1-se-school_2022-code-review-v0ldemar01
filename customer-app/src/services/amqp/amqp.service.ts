import { Channel, connect } from 'amqplib';
import {
  IAmqpConsume,
  IAmqpAssertQueue,
  IAmqpSendToQueue,
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

  async assertQueue({
    queue,
    options = { exclusive: false },
  }: IAmqpAssertQueue): Promise<void> {
    await this.#amqpChannel.assertQueue(
      queue as string,
      options,
    );
  }

  async sendToQueue({ queue, content }: IAmqpSendToQueue): Promise<boolean> {
    return this.#amqpChannel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(content)),
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
