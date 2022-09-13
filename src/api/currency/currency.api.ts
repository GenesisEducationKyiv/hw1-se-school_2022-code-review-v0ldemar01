import { FastifyPluginAsync } from 'fastify';

import { HttpCode, HttpMethod, CurrencyApiPath } from '../../common/enums/enums.js';
import { Currency as CurrencyService } from '../../services/services.js';

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
      const result = await currencyService.getBTCInUAH();

      return rep.status(HttpCode.OK).send(result);
    },
  });
};

export { initCurrencyApi };
