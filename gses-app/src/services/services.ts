import { CurrencyProvider } from '../common/enums/enums.js';
import { ENV } from '../configs/env.config.js';
import { Http } from './http/http.service.js';
import { Email } from './email/email.service.js';
import { initCurrencyServices } from './currency/currency.service.js';
import { Subscription } from './subscription/subscription.service.js';
import { initRepositories } from '../data/repositories/repositories.js';
import { AbstractCurrency } from './currency/abstract-currency.service.js';
import { EmailTransporter } from './email-transporter/email-transporter.service.js';

interface IInitServicesReturn {
  http: Http;
  email: Email;
  subscription: Subscription;
  currency: AbstractCurrency;
}

const initServices = (repositories: ReturnType<typeof initRepositories>): IInitServicesReturn => {
  const { user: userRepository } = repositories;

  const http = new Http();

  const emailTransporter = new EmailTransporter({
    options: {
      host: ENV.EMAIL.HOST,
      port: ENV.EMAIL.PORT,
      secure: ENV.EMAIL.SECURE,
      auth: {
        user: ENV.EMAIL.USERNAME,
        pass: ENV.EMAIL.PASSWORD,
      },
    },
  });

  const email = new Email({
    emailTransporter,
    sourceEmail: ENV.EMAIL.USERNAME,
  });

  const currency = initCurrencyServices({
    http,
    provider: ENV.CURRENCY.CRYPTO_CURRENCY_PROVIDER as CurrencyProvider,
    cachingTime: ENV.CURRENCY.PROXY.CACHING_TIME,
  });

  const subscription = new Subscription({
    userRepository,
    emailService: email,
    currencyService: currency,
  });

  return { http, currency, subscription, email };
};

export { initServices, type Http, type AbstractCurrency, type Subscription, type Email };
