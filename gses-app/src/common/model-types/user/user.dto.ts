import { ISubscribeUserDto } from './subscribe-user.dto.js';

export interface IUserDto extends ISubscribeUserDto {
  id: string;
}