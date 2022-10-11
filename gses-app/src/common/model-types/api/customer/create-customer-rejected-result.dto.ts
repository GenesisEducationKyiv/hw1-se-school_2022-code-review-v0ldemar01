import { EventName } from '../../../enums/enums.js';

interface ICreateCustomerRejectedResult {
  name: EventName;
  err: {
    name: string;
    message: string;
  }
}

export { type ICreateCustomerRejectedResult };