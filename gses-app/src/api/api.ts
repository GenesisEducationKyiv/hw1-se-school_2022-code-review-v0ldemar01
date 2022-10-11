import { FastifyPluginAsync } from 'fastify';

import { ValidationSchema } from '../common/model-types/model-types.js';
import { UserSaga } from '../sagas/sagas.js';
import {
  AbstractCurrency as CurrencyService,
  Subscription as SubscriptionService,
} from '../services/services.js';
import { initCurrencyApi } from './currency/currency.api.js';
import { initSubscriptionApi } from './subscription/subscription.api.js';

interface IInitApiOptions {
  services: {
    currency: CurrencyService;
    subscription: SubscriptionService;
    userSaga: UserSaga;
  };
}

const initApi: FastifyPluginAsync<IInitApiOptions> = async (
  fastify,
  { services: { currency, userSaga, subscription } },
) => {
  fastify.setValidatorCompiler<ValidationSchema>(({
    schema,
  }) => <T>(data: T): ReturnType<ValidationSchema['validate']> => schema.validate(data));

  fastify.register(initCurrencyApi, {
    services: {
      currency,
    },
  });
  fastify.register(initSubscriptionApi, {
    services: {
      subscription,
      userSaga,
    },
  });
};

export { initApi };
