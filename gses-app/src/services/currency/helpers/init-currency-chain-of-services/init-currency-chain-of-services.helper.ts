import { CurrencyServices } from '../../types.js';
import { BinanceCurrency } from '../../binance-currency.service.js';
import { CoinbaseCurrency } from '../../coinbase-currency.service.js';
import { CryptocompareCurrency } from '../../cryptocompare-currency.service.js';

const initBinanceCurrencyChain = (currencyServices: CurrencyServices): BinanceCurrency => {
  const {
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  } = currencyServices;
  binanceCurrency.setNext(coinbaseCurrency).setNext(cryptocompareCurrency);

  return binanceCurrency;
};

const initCoinbaseCurrencyChain = (currencyServices: CurrencyServices): CoinbaseCurrency => {
  const {
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  } = currencyServices;
  coinbaseCurrency.setNext(cryptocompareCurrency).setNext(binanceCurrency);

  return coinbaseCurrency;
};

const initCryptocompareCurrencyChain = (currencyServices: CurrencyServices): CryptocompareCurrency => {
  const {
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  } = currencyServices;
  cryptocompareCurrency.setNext(binanceCurrency).setNext(coinbaseCurrency);

  return cryptocompareCurrency;
};

export {
  initBinanceCurrencyChain,
  initCoinbaseCurrencyChain,
  initCryptocompareCurrencyChain,
};