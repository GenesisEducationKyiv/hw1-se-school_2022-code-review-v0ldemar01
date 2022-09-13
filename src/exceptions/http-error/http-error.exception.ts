import { ExceptionName, HttpCode } from '../../common/enums/enums.js';

type Constructor = {
  name?: ExceptionName;
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = 'Network Error';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    name = ExceptionName.HTTP_ERROR,
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export { HttpError };
