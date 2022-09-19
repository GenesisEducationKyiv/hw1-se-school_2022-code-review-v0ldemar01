import { it, jest, describe, expect, beforeEach } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { IUserDto } from '../../../src/common/model-types/model-types.js';
import {
  IFileStorage,
} from '../../../src/data/repositories/file-storage/file-storage.repository.js';
import {
  FileUserStorage,
} from '../../../src/data/repositories/file-user-storage/file-user-storage.repository.js';

const fileContent = { users: [] as IUserDto[] };

const fileStorage = {} as IFileStorage<IUserDto>;
const fileUserStorage = new FileUserStorage({ storage: fileStorage });

describe('FileUserStorageRepository', () => {
  fileStorage.getItemsByKey = jest.fn<(
    (key: string) => Promise<IUserDto[]>)
  >().mockImplementation(() => Promise.resolve(fileContent.users));

  fileStorage.getEntityByKeyAndSearch = jest.fn<(
    (key: string, user: Partial<IUserDto>) => Promise<IUserDto>)
  >().mockImplementation((_, user) => Promise.resolve(user as IUserDto));

  fileStorage.writeItemsByKey = jest.fn<(
    (key: string, items: IUserDto[]) => Promise<void>)
  >().mockImplementation(() => Promise.resolve());

  fileStorage.clearAllContent = jest.fn<(
    () => Promise<void>)
  >().mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users from storage', async () => {
    const users = await fileUserStorage.getAll();

    expect(users).toEqual([]);
    expect(fileStorage.getItemsByKey).toHaveBeenCalledTimes(1);
    expect(fileStorage.getItemsByKey).toBeCalledWith(fileUserStorage.storageKey);
  });

  it('should return user by search', async () => {
    const user = await fileUserStorage.getOne(fileContent.users[0]);

    expect(user).toEqual(fileContent.users[0]);
    expect(fileStorage.getEntityByKeyAndSearch).toHaveBeenCalledTimes(1);
    expect(fileStorage.getEntityByKeyAndSearch).toBeCalledWith(
      fileUserStorage.storageKey,
      fileContent.users[0],
    );
  });

  it('should write users into storage', async () => {
    const newUsers = Array.from(new Array(4), () => ({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
    }));

    await fileUserStorage.writeAll(newUsers);

    expect(fileStorage.writeItemsByKey).toHaveBeenCalledTimes(1);
    expect(fileStorage.writeItemsByKey).toBeCalledWith(fileUserStorage.storageKey, newUsers);
  });

  it('should write one user into storage', async () => {
    const newUser = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
    };

    await fileUserStorage.writeOne(newUser);

    expect(fileStorage.writeItemsByKey).toHaveBeenCalledTimes(1);
    expect(fileStorage.writeItemsByKey).toBeCalledWith(fileUserStorage.storageKey, [newUser]);
  });

  it('should delete users from storage', async () => {
    await fileUserStorage.truncateAll();

    expect(fileStorage.clearAllContent).toHaveBeenCalledTimes(1);
  });
});
