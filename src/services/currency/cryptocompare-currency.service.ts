/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IGetRateCryptocompareApiResponseDto,
  IGetRateCryptocompareResponseDto,
} from '../../common/model-types/model-types.js';
import { Currency } from '../../common/enums/enums.js';
import { ENV } from '../../configs/configs.js';
import { AbstractCurrency } from './abstract-currency.service.js';

class CryptocompareCurrency extends AbstractCurrency {
  #getCurrencyPairConfig({ from, to }: Record<'from' | 'to', Currency>): Record<string, Currency> {
    return { fsym: from, tsyms: to };
  }

  override async getRate({ from = Currency.BTC, to = Currency.UAH }): Promise<IGetRateCryptocompareResponseDto> {
    try {
      const result = await this.http.load<IGetRateCryptocompareApiResponseDto>(
        (ENV.CURRENCY.CRYPTOCOMPARE_CURRENCY.URL as string),
          { params: this.#getCurrencyPairConfig({ from, to }) },
      );
      const amount = result[to];

      return amount;
    } catch (err) {
      return super.getNextServiceRate({ from, to });
    }
  }
}

export { CryptocompareCurrency };
