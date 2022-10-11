import { it, jest, describe, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { faker } from '@faker-js/faker';

import { ENV } from '../../../src/configs/configs.js';
import {
  FileStorage,
} from '../../../src/data/repositories/file-storage/file-storage.repository.js';

const filePath = resolve(
  dirname(
    fileURLToPath(import.meta.url),
  ),
  '../../../src',
  ENV.APP.STORAGE,
);

const fileContentData = { entities: [] };
let fileContent = JSON.stringify(fileContentData);

const fsAccessSpy = jest
  .spyOn(fs, 'access')
  .mockImplementation((filePathParam) => new Promise((resolve, reject) => {
    if (filePathParam === filePath) {
      resolve();
    } else {
      reject();
    }
  }));

const fsReadFileSpy = jest
  .spyOn(fs, 'readFile')
  .mockImplementation(() => Promise.resolve(fileContent));

const fsWriteFileSpy = jest
  .spyOn(fs, 'writeFile')
  .mockImplementation((_, content) => {
    fileContent = content as string;
    return Promise.resolve();
  });

const fileStorage = new FileStorage({ filePath });

describe('FileStorageRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    fileContent = JSON.stringify(fileContentData);
  });

  it('should not throw error it file exists ', async () => {
    expect(fileStorage.fileExists()).resolves.toEqual(undefined);
    expect(fsAccessSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw error it file not exists ', async () => {
    const fileStorageLocal = new FileStorage({ filePath: filePath + 'sss' });

    expect(fileStorageLocal.fileExists()).rejects.toEqual(undefined);
    expect(fsAccessSpy).toHaveBeenCalledTimes(1);
  });

  it('should return all file content', async () => {
    const fileAllContent = await fileStorage.getAllContent();

    expect(fileAllContent).toEqual(JSON.parse(fileContent));
    expect(fsReadFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should return file content by key', async () => {
    const mockGetAll = jest.spyOn(fileStorage, 'getAllContent');

    const storageKey = 'users';
    const fileContentyByKey = await fileStorage.getItemsByKey(storageKey);

    expect(fileContentyByKey).toEqual(JSON.parse(fileContent)[storageKey]);
    expect(mockGetAll).toHaveBeenCalledTimes(1);
    expect(fsReadFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should write(rewrite) file content', async () => {
    const newFileContent = { newEntities: [] };

    await fileStorage.writeData(newFileContent);

    expect(JSON.parse(fileContent)).toEqual(newFileContent);
    expect(fsWriteFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should write file content by key', async () => {
    const mockWriteData = jest.spyOn(fileStorage, 'writeData');

    const newEntities = [{
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
    }];

    const storageKey = 'users';
    await fileStorage.writeItemsByKey(storageKey, newEntities);

    expect(JSON.parse(fileContent)).toEqual(expect.objectContaining({
      [storageKey]: newEntities,
    }));
    expect(mockWriteData).toHaveBeenCalledTimes(1);
    expect(fsWriteFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear file content', async () => {
    const mockWriteData = jest.spyOn(fileStorage, 'writeData');

    await fileStorage.clearAllContent();

    expect(JSON.parse(fileContent)).toEqual({});
    expect(mockWriteData).toHaveBeenCalledTimes(1);
    expect(fsWriteFileSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear file content by key', async () => {
    const mockWriteData = jest.spyOn(fileStorage, 'writeData');

    await fileStorage.clearItemsByKey('entities');

    expect(JSON.parse(fileContent)).toEqual({ entities: [] });
    expect(mockWriteData).toHaveBeenCalledTimes(1);
    expect(fsWriteFileSpy).toHaveBeenCalledTimes(1);
  });
});
