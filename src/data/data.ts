import { initRepositories } from './repositories/repositories.js';

const initDatabase = (): ReturnType<typeof initRepositories> => {
  return initRepositories();
};

export { initDatabase };
