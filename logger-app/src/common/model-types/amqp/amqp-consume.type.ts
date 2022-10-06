import { Options } from 'amqplib';
import { AmqpQueue } from '../../enums/enums.js';

interface IAmqpConsume {
  queue: AmqpQueue;
  onMessage: (data: Buffer) => void;
  options?: Options.Consume;
}

export { type IAmqpConsume };