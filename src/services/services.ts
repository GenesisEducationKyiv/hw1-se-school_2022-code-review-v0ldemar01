import { ENV } from '../configs/env.config.js';
import { Http } from './http/http.service.js';
import { Email } from './email/email.service.js';
import { Currency } from './currency/currency.service.js';
import { Subscription } from './subscription/subscription.service.js';
import { initRepositories } from '~/data/repositories/repositories.js';
import { EmailTransporter } from './email-transporter/email-transporter.service.js';

interface IInitServicesReturn {
  http: Http;
  email: Email;
  currency: Currency;
  subscription: Subscription;
}

const initServices = (repositories: ReturnType<typeof initRepositories>): IInitServicesReturn => {
  const { user: userRepository } = repositories;

  const http = new Http();

  const currency = new Currency({
    http,
  });

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

  const subscription = new Subscription({
    userRepository,
    emailService: email,
    currencyService: currency,
  });

  return { http, currency, subscription, email };
};

export { initServices, type Http, type Currency, type Subscription, type Email };
