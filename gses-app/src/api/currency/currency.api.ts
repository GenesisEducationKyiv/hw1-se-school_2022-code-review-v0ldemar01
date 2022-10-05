import { FastifyPluginAsync } from 'fastify';

import { HttpCode, HttpMethod, CurrencyApiPath, Currency } from '../../common/enums/enums.js';
import { AbstractCurrency as CurrencyService } from '../../services/services.js';

interface IInitCurrencyApiOptions {
  services: {
    currency: CurrencyService;
  };
}

const initCurrencyApi: FastifyPluginAsync<IInitCurrencyApiOptions> = async (fastify, opts) => {
  const { currency: currencyService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CurrencyApiPath.GetRate,
    handler: async (_req, rep) => {
      const result = await currencyService.getRate({ from: Currency.BTC, to: Currency.UAH });

      return rep.status(HttpCode.OK).send(result);
    },
  });
};

export { initCurrencyApi };
