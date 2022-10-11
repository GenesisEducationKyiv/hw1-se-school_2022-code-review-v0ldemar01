import { config } from 'dotenv';

config();

const {
  PORT,
  HOST,
  CACHING_TIME,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  BINANCE_CURRENCY_URL,
  COINBASE_CURRENCY_URL,
  CRYPTO_CURRENCY_PROVIDER,
  CRYPTOCOMPARE_CURRENCY_URL,
} = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
    SERVER_HOST: String(HOST),
    STORAGE: './data/storage.json',
  },
  API: {
    V1_PREFIX: '/api/v1',
    DOCUMENTATION_PREFIX: '/swagger',
  },
  CURRENCY: {
    BINANCE_CURRENCY: {
      URL: BINANCE_CURRENCY_URL,
    },
    COINBASE_CURRENCY: {
      URL: COINBASE_CURRENCY_URL,
    },
    CRYPTOCOMPARE_CURRENCY: {
      URL: CRYPTOCOMPARE_CURRENCY_URL,
    },
    CRYPTO_CURRENCY_PROVIDER,
    PROXY: {
      CACHING_TIME: Number(CACHING_TIME),
    },
  },
  EMAIL: {
    HOST: 'mail.binary-studio.com',
    PORT: 465,
    SECURE: true,
    USERNAME: String(EMAIL_USERNAME),
    PASSWORD: String(EMAIL_PASSWORD),
  },
  RABBITMQ: {
    URL: `amqp://${String(RABBITMQ_HOST)}:${Number(RABBITMQ_PORT)}`,
  },

} as const;

export { ENV };