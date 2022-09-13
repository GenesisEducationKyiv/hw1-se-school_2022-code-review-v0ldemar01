import { IUserDto } from '~/common/model-types/model-types.js';
import { FileStorage } from '../file-storage/file-storage.repository.js';

interface IFileEmailStorageConstructor {
  storage: FileStorage;
}

class FileUserStorage {
  #storage: FileStorage;
  #storageKey = 'users';

  constructor({ storage }: IFileEmailStorageConstructor) {
    this.#storage = storage;
  }

  get storage(): FileStorage {
    return this.#storage;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getByKey<IUserDto>(this.#storageKey);
  }

  writeOne(user: IUserDto): Promise<void> {
    return this.#storage.writeByKey<IUserDto>(this.#storageKey, [user]);
  }

  writeAll(users: IUserDto[]): Promise<void> {
    return this.#storage.writeByKey<IUserDto>(this.#storageKey, users);
  }

  truncateAll(): Promise<void> {
    return this.#storage.clearAll();
  }
}

export { FileUserStorage };
