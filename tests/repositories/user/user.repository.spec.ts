import { it, jest, expect, describe, beforeEach } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { IUserDto } from '../../../src/common/model-types/model-types.js';
import {
  FileUserStorage,
} from '../../../src/data/repositories/file-user-storage/file-user-storage.repository.js';
import {
  User as UserRepository,
} from '../../../src/data/repositories/user/user.repository.js';

const fileContent = {
  users: [{
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
  }],
};

const fileUserStorage = {} as FileUserStorage;
const userRepository = new UserRepository({
  storage: fileUserStorage,
});

describe('UserRepository', () => {

  fileUserStorage.getAll = jest.fn<(
    () => Promise<IUserDto[]>)
  >().mockImplementation(() => Promise.resolve(fileContent.users));

  fileUserStorage.getOne = jest.fn<(
    (user: Partial<IUserDto>) => Promise<IUserDto>)
  >().mockImplementation((user) => Promise.resolve(user as IUserDto));

  fileUserStorage.writeOne = jest.fn<(
    (user: IUserDto) => Promise<void>)
  >().mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = await userRepository.getAll();

    expect(users).toEqual(fileContent.users);
    expect(fileUserStorage.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return user by id', async () => {
    const user = await userRepository.getById(fileContent.users[0].id);

    expect(user).toEqual(expect.objectContaining({
      id: fileContent.users[0].id,
    }));
    expect(fileUserStorage.getOne).toHaveBeenCalledTimes(1);
    expect(fileUserStorage.getOne).toBeCalledWith({
      id: fileContent.users[0].id,
    });
  });

  it('should return user by email', async () => {
    const user = await userRepository.getOne({
      email: fileContent.users[0].email,
    });

    expect(user).toEqual(expect.objectContaining({
      email: fileContent.users[0].email,
    }));
    expect(fileUserStorage.getOne).toHaveBeenCalledTimes(1);
    expect(fileUserStorage.getOne).toBeCalledWith({
      email: fileContent.users[0].email,
    });
  });

  it('should find correct user by search', async () => {
     const user = await userRepository.getOne(fileContent.users[0]);

    expect(user).toEqual(fileContent.users[0]);
    expect(fileUserStorage.getOne).toHaveBeenCalledTimes(1);
    expect(fileUserStorage.getOne).toBeCalledWith(fileContent.users[0]);
  });

  it('should subscribe user', async () => {
    const attemptUserToSubscribe = {
      email: faker.internet.email(),
    };
    const user = await userRepository.subscribe(attemptUserToSubscribe);

    expect(user?.email).toEqual(attemptUserToSubscribe.email);
    expect(fileUserStorage.writeOne).toHaveBeenCalledTimes(1);
    expect(fileUserStorage.writeOne).toBeCalledWith(
      expect.objectContaining(attemptUserToSubscribe),
    );
  });
});