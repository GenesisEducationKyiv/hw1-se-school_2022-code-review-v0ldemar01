import { IUserDto } from '../../../common/model-types/model-types.js';
import { IFileStorage } from '../file-storage/file-storage.repository.js';

interface IFileEmailStorageConstructor {
  storage: IFileStorage<IUserDto>;
}

interface IFileUserStorage {
  getAll: () => Promise<IUserDto[]>;
  getOne: (search: Partial<IUserDto>) => Promise<IUserDto | null>;
  writeOne: (user: IUserDto) => Promise<void>;
  writeAll: (users: IUserDto[]) => Promise<void>;
  truncateAll: () => Promise<void>;
}

class FileUserStorage implements IFileUserStorage {
  #storage: IFileStorage<IUserDto>;
  #storageKey = 'users';

  constructor({ storage }: IFileEmailStorageConstructor) {
    this.#storage = storage;
  }

  get storage(): IFileStorage<IUserDto> {
    return this.#storage;
  }

  get storageKey(): string {
    return this.#storageKey;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getItemsByKey(this.#storageKey);
  }

  getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.#storage.getEntityByKeyAndSearch(this.#storageKey, search);
  }

  writeOne(user: IUserDto): Promise<void> {
    return this.#storage.writeItemsByKey(this.#storageKey, [user]);
  }

  writeAll(users: IUserDto[]): Promise<void> {
    return this.#storage.writeItemsByKey(this.#storageKey, users);
  }

  truncateAll(): Promise<void> {
    return this.#storage.clearAllContent();
  }
}

export { FileUserStorage, type IFileUserStorage };
