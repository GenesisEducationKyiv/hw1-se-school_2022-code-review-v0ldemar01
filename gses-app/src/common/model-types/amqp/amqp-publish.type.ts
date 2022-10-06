import { AmqpExchange } from '../../enums/enums.js';

interface IAmqpPublish {
  exchange: AmqpExchange;
  severity: string;
  content: unknown;
}

export { type IAmqpPublish };