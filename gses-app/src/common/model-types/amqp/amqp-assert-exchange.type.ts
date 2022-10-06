import { Options } from 'amqplib';
import { AmqpExchange } from '../../enums/enums.js';

interface IAmqpAssertExchange {
  exchange: AmqpExchange;
  type:
    | 'direct'
    | 'topic'
    | 'headers'
    | 'fanout';
  options: Options.AssertExchange;
}

export { type IAmqpAssertExchange };