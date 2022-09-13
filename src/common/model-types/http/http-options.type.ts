import { HttpMethod, HttpHeader, ContentType } from '../../enums/enums.js';

interface IHttpOptions<T, K> {
  method: HttpMethod;
  contentType: ContentType;
  headers: Record<HttpHeader, string>;
  data: T;
  hasAuth?: boolean;
  params?: K;
}

export type { IHttpOptions };
