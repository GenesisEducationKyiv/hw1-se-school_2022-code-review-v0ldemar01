import { AmqpExchange, AmqpRoutingKey } from '../../enums/enums.js';

interface IAmqpPublish {
  exchange: AmqpExchange;
  routingKey: AmqpRoutingKey;
  content: unknown;
}

export { type IAmqpPublish };