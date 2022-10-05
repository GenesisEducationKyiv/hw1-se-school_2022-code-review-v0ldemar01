import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { HttpMethod } from '../../common/enums/enums.js';
import { IHttpOptions } from '../../common/model-types/model-types.js';

class Http {
  #axios: AxiosInstance;

  constructor() {
    this.#axios = axios.create({
      timeout: 5000,
    });
  }

  async load<T, K = unknown, M = unknown>(url: string, options: Partial<IHttpOptions<K, M>> = {}): Promise<T> {
    const { method = HttpMethod.GET, data, headers, params } = options;

    return this.#axios
      .request({
        url,
        method,
        headers,
        data,
        params,
      })
      .then((res: AxiosResponse) => res?.data)
      .catch(this._throwError);
  }

  _throwError(err: Error): never {
    throw err;
  }
}

export { Http };
