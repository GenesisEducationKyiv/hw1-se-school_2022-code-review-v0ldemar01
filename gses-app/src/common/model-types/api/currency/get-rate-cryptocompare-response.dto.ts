import { ICryptocompareSymDto } from '../../model-types.js';
import { IGetRateAbstractResponseDto } from './get-rate-abstract-response.dto.js';

type IGetRateCryptocompareResponseDto = IGetRateAbstractResponseDto;

type IGetRateCryptocompareApiResponseDto = ICryptocompareSymDto;

export {
  type IGetRateCryptocompareResponseDto,
  type IGetRateCryptocompareApiResponseDto,
};