/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 } from 'uuid';

import {
  IUserDto,
  ISubscribeUserDto,
} from '../../../common/model-types/model-types.js';
import { IFileUserStorage } from '../file-user-storage/file-user-storage.repository.js';

interface IUserRepositoryConstructor {
  storage: IFileUserStorage;
}

class User {
  #storage: IFileUserStorage;

  constructor({ storage }: IUserRepositoryConstructor) {
    this.#storage = storage;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getAll();
  }

  getById(id: string): Promise<IUserDto | null> {
    return this.#storage.getOne({ id }) as Promise<IUserDto | null>;
  }

  getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.#storage.getOne(search);
  }

  async subscribe({ email }: ISubscribeUserDto): Promise<IUserDto> {
    const newUser = { id: v4(), email };

    await this.#storage.writeOne(newUser);

    return newUser;
  }

  async unsubscribe(search: Partial<IUserDto>): Promise<void> {
    // todo
  }
}

export { User };
