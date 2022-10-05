import { afterAll, beforeAll } from '@jest/globals';
import { FastifyInstance } from 'fastify';

import { buildServer } from '../../../src/server.js';

const buildApp = (): FastifyInstance => {
  const app = buildServer({
    logger: false,
  });

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
};

export { buildApp };