import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import swagger, { StaticPathSpec } from '@fastify/swagger';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';

import { ENV } from './configs/configs.js';
import { initApi } from './api/api.js';
import { initServices } from './services/services.js';
import { initDatabase } from './data/data.js';
import { AmqpExchange } from './common/enums/enums.js';

const buildServer = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const app = Fastify(opts);

  app.register(cors, {
    origin: '*',
  });

  app.register(formBody);

  const repositories = initDatabase();
  const { amqp, currency, subscription } = await initServices(repositories);

  app.setErrorHandler((error, _, reply) => {
    amqp.publish({ exchange: AmqpExchange.LOGS, severity: 'error', content: error });

    reply.send(error);
  });

  app.register(initApi, {
    services: {
      currency,
      subscription,
    },
    prefix: ENV.API.V1_PREFIX,
  });

  app.register(swagger, {
    routePrefix: ENV.API.DOCUMENTATION_PREFIX,
    mode: 'static',
    exposeRoute: true,
    specification: ((): StaticPathSpec => {
      const url = new URL('./documentation', import.meta.url).pathname;

      return {
        path: `${url}/documentation.yaml`,
        baseDir: url,
      };
    })(),
  });

  return app;
};

export { buildServer };
