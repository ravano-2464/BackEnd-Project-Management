import CustomError from "./CustomError";

class ForbiddenError extends CustomError {
  errorCode = 403;
  errorType = "FORBIDDEN";

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default ForbiddenError;
