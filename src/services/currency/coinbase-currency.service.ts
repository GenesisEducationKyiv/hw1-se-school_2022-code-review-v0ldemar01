/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IGetRateCoinbaseResponseDto,
  IGetRateCoinbaseApiResponseDto,
} from '../../common/model-types/model-types.js';
import { Currency } from '../../common/enums/enums.js';
import { ENV } from '../../configs/configs.js';
import { AbstractCurrency } from './abstract-currency.service.js';

class CoinbaseCurrency extends AbstractCurrency {
  #getCurrencyPair({ from, to }: Record<'from' | 'to', Currency>): string {
    return `${from}-${to}`;
  }

  override async getRate({ from = Currency.BTC, to = Currency.UAH }): Promise<IGetRateCoinbaseResponseDto> {
    try {
      const result = await this.http.load<IGetRateCoinbaseApiResponseDto>(
        (ENV.CURRENCY.COINBASE_CURRENCY.URL as string)
          .replace(
            ':currency_pair',
            this.#getCurrencyPair({ from, to }),
          ),
      );
      const { data: { amount } } = result;

      return amount;
    } catch (err) {
      return super.getNextServiceRate({ from, to });
    }
  }
}

export { CoinbaseCurrency };
