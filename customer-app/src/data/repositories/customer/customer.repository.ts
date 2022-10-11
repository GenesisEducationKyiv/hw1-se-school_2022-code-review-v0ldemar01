
import { v4 } from 'uuid';
import {
  IUserDto,
  ICreateUserDto,
} from '../../../common/model-types/model-types';

interface IUserRepositoryConstructor {
  userCollection: IUserDto[];
}

class Customer {
  #userCollection: IUserDto[];

  constructor({ userCollection }: IUserRepositoryConstructor) {
    this.#userCollection = userCollection;
  }

  async getAll(): Promise<IUserDto[]> {
    return new Promise((resolve) => resolve(this.#userCollection.slice()));
  }

  async getById(id: string): Promise<IUserDto | null> {
    return this.getOne({ id });
  }

  async getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.findOne(search);
  }

  async findOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    const user = this.#userCollection.find((user) => {
      return Object.entries(search).every(
        ([key, value]) => user[key as keyof IUserDto] === value,
      );
    });

    return new Promise((resolve) => resolve(user ?? null));
  }

  async create({ email }: ICreateUserDto): Promise<IUserDto> {
    const newUser = { id: v4(), email };
    this.#userCollection.push(newUser);

    return newUser;
  }
}

export { Customer };