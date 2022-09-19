import { Currency } from '../../common/enums/enums.js';
import { IGetRateAbstractResponseDto } from '../../common/model-types/model-types.js';
import { CurrencyError } from '../../exceptions/exceptions.js';
import { Http as HttpServive } from '../services.js';

interface IAbstractCurrencyConstructor {
  http: HttpServive;
}

abstract class AbstractCurrency {
  #http: HttpServive;
  #nextService: AbstractCurrency | undefined;

  constructor({ http }: IAbstractCurrencyConstructor) {
    this.#http = http;
  }

  get http(): HttpServive {
    return this.#http;
  }

  setNext(service: AbstractCurrency): AbstractCurrency {
    this.#nextService = service;

    return this.#nextService;
  }

  getRate(_: Record<'from' | 'to', Currency>): Promise<IGetRateAbstractResponseDto> {
    return Promise.resolve(0);
  }

  getNextServiceRate(currencyConfig: Record<'from' | 'to', Currency>): Promise<IGetRateAbstractResponseDto> {
    if (this.#nextService) {
      return this.#nextService.getRate(currencyConfig);
    }

    return Promise.reject(new CurrencyError());
  }
}

export { AbstractCurrency };
