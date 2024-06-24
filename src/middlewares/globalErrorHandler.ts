import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.errorCode).json({ error: err.serializeErrors() });
  }

  console.error(err);
  res.status(500).json({
    error: [{ message: "Internal Server Error" }],
  });
};

export default globalErrorHandler;
