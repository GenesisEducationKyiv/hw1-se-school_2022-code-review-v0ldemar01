/* eslint-disable no-console */
import { Currency } from '../../common/enums/enums.js';
import { IGetRateAbstractResponseDto } from '../../common/model-types/model-types.js';
import { AbstractCurrency } from './abstract-currency.service.js';

interface ILoggingCurrencyConstructor {
  currencyService: AbstractCurrency;
}

class LoggingCurrency extends AbstractCurrency {
  #currencyService: AbstractCurrency;

  constructor({ currencyService }: ILoggingCurrencyConstructor) {
    super({ http: currencyService.http });
    this.#currencyService = currencyService;
  }

  override async getRate({ from = Currency.BTC, to = Currency.UAH }): Promise<IGetRateAbstractResponseDto> {
    const rate = await this.#currencyService.getRate({
      from,
      to,
    });

    console.log(`Response rate: ${rate}`);

    return rate;
  }
}

export { LoggingCurrency };
