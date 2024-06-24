import { NextFunction, Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: [
      {
        message: "Route not found",
      },
    ],
  });
};

export default notFoundHandler;
