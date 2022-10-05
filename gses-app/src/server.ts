import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import swagger, { StaticPathSpec } from '@fastify/swagger';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';

import { ENV } from './configs/configs.js';
import { initApi } from './api/api.js';
import { initServices } from './services/services.js';
import { initDatabase } from './data/data.js';

const buildServer = (opts: FastifyServerOptions = {}): FastifyInstance => {
  const app = Fastify(opts);

  app.register(cors, {
    origin: '*',
  });

  app.register(formBody);

  const repositories = initDatabase();
  const { currency, subscription } = initServices(repositories);

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
