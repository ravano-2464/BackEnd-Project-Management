import CustomError from "./CustomError";

class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "VALIDATION_ERROR";

  constructor(message: string, private fields?: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message, field: this.fields }];
  }
}

export default ValidationError;
