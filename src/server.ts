/* eslint-disable no-console */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import swagger, { StaticPathSpec } from '@fastify/swagger';

import { ENV } from './configs/configs.js';
import { initApi } from './api/api.js';
import { initServices } from './services/services.js';
import { initDatabase } from './data/data.js';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

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

app.listen({ port: ENV.APP.SERVER_PORT, host: ENV.APP.SERVER_HOST });

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});
