import { ExceptionMessage, ExceptionName } from '../../common/enums/enums.js';

class CustomerError extends Error {
  public constructor({
    message = ExceptionMessage.USER_ALREADY_EXISTS,
  } = {}) {
    super(message);
    this.name = ExceptionName.CUSTOMER_ERROR;
  }
}

export { CustomerError };
