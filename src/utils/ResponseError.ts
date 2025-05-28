import ERROR_MESSAGES from './consts/error';
import RESPONSE_CODE from './consts/responseCode';

class ResponseError extends Error {
  status: number;

  constructor({ message, status }: {
    message: string,
    status: number
  }) {
    super(message);
    this.status = status;
  }

  static getInternalError() {
    return new ResponseError({
      message: ERROR_MESSAGES.internalError,
      status: RESPONSE_CODE.internalError,
    });
  }
}

export default ResponseError;
