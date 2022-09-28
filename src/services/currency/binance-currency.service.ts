/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IGetRateCoinbaseResponseDto,
  IGetRateCoinbaseApiResponseDto,
} from '../../common/model-types/model-types.js';
import { Currency } from '../../common/enums/enums.js';
import { ENV } from '../../configs/configs.js';
import { AbstractCurrency } from './abstract-currency.service.js';

class BinanceCurrency extends AbstractCurrency {
  #getCurrencyPairConfig({ from, to }: Record<'from' | 'to', Currency>): Record<string, string> {
    return {
      symbol: `${from}${to}`,
    };
  }

  override async getRate({ from = Currency.BTC, to = Currency.UAH }): Promise<IGetRateCoinbaseResponseDto> {
    try {
      const result = await this.http.load<IGetRateCoinbaseApiResponseDto>(
        (ENV.CURRENCY.BINANCE_CURRENCY.URL as string),
          {
            params: this.#getCurrencyPairConfig({ from, to }),
          },
      );
      const { data: { amount } } = result;

      return amount;
    } catch (err) {
      return super.getNextServiceRate({ from, to });
    }
  }
}

export { BinanceCurrency };
