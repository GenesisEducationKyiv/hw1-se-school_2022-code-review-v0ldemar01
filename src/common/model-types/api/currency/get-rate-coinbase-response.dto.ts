import { ICoinbaseBuyDto } from '../../model-types.js';
import { IGetRateAbstractResponseDto } from './get-rate-abstract-response.dto.js';

type IGetRateCoinbaseResponseDto = IGetRateAbstractResponseDto;

interface IGetRateCoinbaseApiResponseDto {
  data: ICoinbaseBuyDto,
}

export {
  type IGetRateCoinbaseResponseDto,
  type IGetRateCoinbaseApiResponseDto,
};