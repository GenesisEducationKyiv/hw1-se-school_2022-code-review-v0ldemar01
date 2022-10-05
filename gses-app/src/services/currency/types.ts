import { BinanceCurrency } from './binance-currency.service.js';
import { CoinbaseCurrency } from './coinbase-currency.service.js';
import { CryptocompareCurrency } from './cryptocompare-currency.service.js';

type CurrencyServices = {
  binanceCurrency: BinanceCurrency;
  coinbaseCurrency: CoinbaseCurrency
  cryptocompareCurrency: CryptocompareCurrency
};

export { type CurrencyServices };