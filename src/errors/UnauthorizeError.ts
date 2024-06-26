import CustomError from "./CustomError";

class UnauthorizeError extends CustomError {
  errorCode = 401;
  errorType = "UNAUTHORIZED";

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizeError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default UnauthorizeError;
