import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { ISubscribeUserRequestDto } from '../../common/model-types/model-types.js';
import { ExceptionName, HttpCode, HttpMethod, SubscriptionApiPath } from '../../common/enums/enums.js';
import {
  subscribeUser as subscribeUserValidationSchema,
} from '../../validation-schemas/validation-schemas.js';
import { Subscription as SubscriptionService } from '../../services/services.js';

interface IInitSubscriptionApiOptions {
  services: {
    subscription: SubscriptionService;
  };
}

const initSubscriptionApi: FastifyPluginAsync<IInitSubscriptionApiOptions> = async (fastify, opts) => {
  const { subscription: subscriptionService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SubscriptionApiPath.Subscribe,
    schema: {
      body: subscribeUserValidationSchema,
    },
    handler: async (req: FastifyRequest<{ Body: ISubscribeUserRequestDto }>, rep) => {
      try {
        await subscriptionService.subscribeUser({ email: req.body.email });

        return rep.status(HttpCode.OK).send();
      } catch (err) {
        if ((err as Error).name === ExceptionName.SUBSCRIPTION_ERROR) {
          return rep.status(HttpCode.CONFLICT).send(err);
        }
        return rep.status(HttpCode.BAD_REQUEST).send(err);
      }
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: SubscriptionApiPath.SendEmails,
    handler: async (_req, rep) => {
      await subscriptionService.sendEmails();

      return rep.status(HttpCode.OK).send();
    },
  });
};

export { initSubscriptionApi };
