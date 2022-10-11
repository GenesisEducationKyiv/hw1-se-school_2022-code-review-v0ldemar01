import { Options } from 'amqplib';
import { AmqpQueue } from '../../enums/enums.js';

interface IAmqpAssertQueue {
  queue: AmqpQueue;
  options?: Options.AssertQueue;
}

export { type IAmqpAssertQueue };