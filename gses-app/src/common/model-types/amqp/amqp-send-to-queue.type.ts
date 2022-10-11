import { Options } from 'amqplib';
import { AmqpQueue } from '../../enums/enums.js';

interface IAmqpSendToQueue {
  queue: AmqpQueue;
  content: unknown;
  options?: Options.Publish;
}

export { type IAmqpSendToQueue };