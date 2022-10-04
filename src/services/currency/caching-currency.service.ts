import {
  IGetRateAbstractResponseDto,
} from '../../common/model-types/model-types.js';
import { Currency } from '../../common/enums/enums.js';
import { getDateDiff } from '../../helpers/helpers.js';
import { AbstractCurrency } from './abstract-currency.service.js';

interface ICachingCurrencyConstructor {
  currencyService: AbstractCurrency;
  cachingTime: number;
}

class CachingCurrency extends AbstractCurrency {
  #currencyService: AbstractCurrency;
  #cachedCurrencyRate: number | null = null;
  #cachingTime: number;
  #lastUpdate: Date | null = null;

  constructor({ currencyService, cachingTime }: ICachingCurrencyConstructor) {
    super({ http: currencyService.http });
    this.#currencyService = currencyService;
    this.#cachingTime = cachingTime;
  }

  get #checkExpiredCache(): boolean {
    if (this.#lastUpdate) {
      return (
        getDateDiff(new Date(), this.#lastUpdate) <
        this.#cachingTime
      );
    }

    return false;
  }

  override async getRate({ from = Currency.BTC, to = Currency.UAH }): Promise<IGetRateAbstractResponseDto> {
    if (this.#checkExpiredCache) {
      return this.#cachedCurrencyRate as number;
    }

    const rate = await this.#currencyService.getRate({
      from,
      to,
    });
    this.#cachedCurrencyRate = rate as number;
    this.#lastUpdate = new Date();

    return rate;
  }
}

export { CachingCurrency };
