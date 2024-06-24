abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export default CustomError;
