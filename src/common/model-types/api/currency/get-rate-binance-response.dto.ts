import { IBinanceTickerDto } from '../../model-types.js';
import { IGetRateAbstractResponseDto } from './get-rate-abstract-response.dto.js';

type IGetRateBinanceResponseDto = IGetRateAbstractResponseDto;

type IGetRateCoinbaseApiResponseDto = IBinanceTickerDto;

export {
  type IGetRateBinanceResponseDto,
  type IGetRateCoinbaseApiResponseDto,
};