import { CurrencyProvider } from '../../../../common/enums/enums.js';
import { CurrencyServices } from '../../types.js';
import {
  initBinanceCurrencyChain,
  initCoinbaseCurrencyChain,
  initCryptocompareCurrencyChain,
} from '../helpers.js';

const getCurrencyServiceByProvider = (
  currencyServices: CurrencyServices,
  provider: CurrencyProvider,
): CurrencyServices[keyof CurrencyServices] => {
  const currencyDictionary: Record<
    CurrencyProvider,
    (currencyServices: CurrencyServices) => CurrencyServices[keyof CurrencyServices]
  > = {
    [CurrencyProvider.BINANCE]: initBinanceCurrencyChain,
    [CurrencyProvider.COINBASE]: initCoinbaseCurrencyChain,
    [CurrencyProvider.CRYPTOCOMPARE]: initCryptocompareCurrencyChain,
  };

  return (currencyDictionary[provider]
    ?? currencyDictionary[CurrencyProvider.BINANCE]
  )(currencyServices);
};

export { getCurrencyServiceByProvider };