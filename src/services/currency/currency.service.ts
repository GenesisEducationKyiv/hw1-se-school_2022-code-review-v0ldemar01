import { ENV } from '../../configs/configs.js';
import {
  IGetBTCInUAHFullResponseDto,
  IGetBTCInUAHResponseDto,
} from '../../common/model-types/model-types.js';
import { Http as HttpServive } from '../../services/services.js';

interface ICurrencyServiceConstructor {
  http: HttpServive;
}

class Currency {
  #http: HttpServive;

  constructor({ http }: ICurrencyServiceConstructor) {
    this.#http = http;
  }

  async getBTCInUAH(): Promise<IGetBTCInUAHResponseDto> {
    const result = await this.#http.load<IGetBTCInUAHFullResponseDto>(
      ENV.CURRENCY.CURRENCY_RATE_API_URL as string,
    );
    const { price: { uah } } = result.data[0];

    return uah;
  }
}

export { Currency };
