import { CurrencyProvider } from '../../common/enums/enums.js';
import { Http as HttpService } from '../http/http.service.js';
import { BinanceCurrency } from './binance-currency.service.js';
import { CoinbaseCurrency } from './coinbase-currency.service.js';
import { CryptocompareCurrency } from './cryptocompare-currency.service.js';
import { getCurrencyServiceByProvider } from './helpers/helpers.js';
import { AbstractCurrency } from './abstract-currency.service.js';
import { LoggingCurrency } from './logging-currency.service.js';
import { CachingCurrency } from './caching-currency.service.js';

const initCurrencyServices = ({
  http,
  provider,
  cachingTime,
}: {
  http: HttpService;
  provider: CurrencyProvider;
  cachingTime: number;
}): AbstractCurrency => {
  const binanceCurrency = new BinanceCurrency({
    http,
  });

  const coinbaseCurrency = new CoinbaseCurrency({
    http,
  });

  const cryptocompareCurrency = new CryptocompareCurrency({
    http,
  });

  const currentCurrency = getCurrencyServiceByProvider({
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  }, provider);

  const cachingCurrency = new CachingCurrency({
    currencyService: currentCurrency,
    cachingTime,
  });

  const loggingCurrency = new LoggingCurrency({
    currencyService: cachingCurrency,
  });

  return loggingCurrency;
};

export { initCurrencyServices };