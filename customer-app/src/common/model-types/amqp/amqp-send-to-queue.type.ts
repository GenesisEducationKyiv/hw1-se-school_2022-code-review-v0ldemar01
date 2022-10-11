import { AmqpQueue } from '../../enums/enums.js';

interface IAmqpSendToQueue {
  queue: AmqpQueue;
  content: unknown;
}

export { type IAmqpSendToQueue };