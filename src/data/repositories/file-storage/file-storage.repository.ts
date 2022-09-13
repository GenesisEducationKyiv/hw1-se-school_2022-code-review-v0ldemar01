import { constants, promises as fs } from 'fs';

interface IFileStorageConstructor {
  filePath: string;
}

class FileStorage {
  #filePath: string;

  constructor({ filePath }: IFileStorageConstructor) {
    this.#filePath = filePath;
  }

  async fileExists(): Promise<void> {
    return fs.access(this.#filePath, constants.F_OK);
  }

  async getAll<T>(): Promise<T> {
    this.fileExists();
    return JSON.parse((await fs.readFile(this.#filePath, 'utf-8')));
  }

  async getByKey<T>(key: string): Promise<T[]> {
    const data = (await this.getAll<Record<string, T[]>>() as Record<string, T[]>);

    return data[key];
  }

  async writeByKey<
    T,
  >(key: string, items: T[]): Promise<void> {
    const data = (await this.getAll<Record<string, T[]>>() as Record<string, T[]>);
    data[key] = data[key].concat(items);
    this.writeData(data);
  }

  clearByKey(key: keyof string): Promise<void> {
    return this.writeData({ [key]: [] });
  }

  clearAll(): Promise<void> {
    return this.writeData({});
  }

  writeData<T>(data: T): Promise<void> {
    return fs.writeFile(this.#filePath, JSON.stringify(data), { flag: 'a' });
  }
}

export { FileStorage };
