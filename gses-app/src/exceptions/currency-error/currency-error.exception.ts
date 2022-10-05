import { ExceptionMessage, ExceptionName } from '../../common/enums/enums.js';

class CurrencyError extends Error {
  public constructor({
    message = ExceptionMessage.GET_RATE_FAILED,
  } = {}) {
    super(message);
    this.name = ExceptionName.CURRENCY_ERROR;
  }
}

export { CurrencyError };
