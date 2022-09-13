import { ExceptionMessage, ExceptionName } from '../../common/enums/enums.js';

class SubscriptionError extends Error {
  public constructor({
    message = ExceptionMessage.USER_ALREADY_EXISTS,
  } = {}) {
    super(message);
    this.name = ExceptionName.SUBSCRIPTION_ERROR;
  }
}

export { SubscriptionError };
