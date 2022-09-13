import { v4 } from 'uuid';

import {
  IUserDto,
  ISubscribeUserDto,
} from '../../../common/model-types/model-types.js';
import { FileUserStorage } from '../file-user-storage/file-user-storage.js';

interface IUserRepositoryConstructor {
  storage: FileUserStorage;
}

class User {
  #storage: FileUserStorage;

  constructor({ storage }: IUserRepositoryConstructor) {
    this.#storage = storage;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getAll();
  }

  getById(id: string): Promise<IUserDto | null> {
    return this.getOne({ id });
  }

  getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.findOne(search);
  }

  async findOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    const users = await this.getAll();
    const currentUser = users.find((user) => {
      return Object.entries(search).every(
        ([key, value]) => user[key as keyof IUserDto] === value,
      );
    });

    return currentUser ?? null;
  }

  async subscribe({ email }: ISubscribeUserDto): Promise<IUserDto> {
    const newUser = { id: v4(), email };

    await this.#storage.writeOne(newUser);

    return newUser;
  }
}

export { User };
