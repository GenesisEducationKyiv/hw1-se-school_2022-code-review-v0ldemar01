import { ICreateUserDto } from './create-user.dto.js';

interface IUserDto extends ICreateUserDto {
  id: string;
}

export { type IUserDto };