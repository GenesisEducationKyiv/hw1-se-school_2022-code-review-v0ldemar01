import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENV } from '../../configs/configs.js';
import { FileUserStorage } from './file-user-storage/file-user-storage.repository.js';
import { FileStorage } from './file-storage/file-storage.repository.js';
import { User } from './user/user.repository.js';

interface IInitRepositoriesReturn {
  user: User;
}

const initRepositories = (): IInitRepositoriesReturn => {
  const fileUserStorage = new FileUserStorage({
    storage: new FileStorage({
      filePath: path.resolve(
        path.dirname(
          fileURLToPath(import.meta.url),
        ),
        '../../',
        ENV.APP.STORAGE,
      ),
    }),
  });
  const user = new User({
    storage: fileUserStorage,
  });

  return { user };
};

export { initRepositories, type User, type FileStorage };
