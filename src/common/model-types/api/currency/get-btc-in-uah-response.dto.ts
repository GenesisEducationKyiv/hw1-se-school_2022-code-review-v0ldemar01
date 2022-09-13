import { ICurrencyBTCInUAHDTo } from '../../model-types.js';

export type IGetBTCInUAHResponseDto = ICurrencyBTCInUAHDTo['uah'];

export interface IGetBTCInUAHFullResponseDto {
  data: [{
    price: {
      uah: IGetBTCInUAHResponseDto;
    };
  }],
}