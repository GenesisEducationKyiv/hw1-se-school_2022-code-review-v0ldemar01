import { AmqpExchange, AmqpQueue, AmqpRoutingKey } from '../../enums/enums.js';

interface IAmqpBindQueue {
  queue: AmqpQueue;
  exchange: AmqpExchange;
  routingKey: AmqpRoutingKey;
}

export { type IAmqpBindQueue };