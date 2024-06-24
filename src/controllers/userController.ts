import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/userService";
import { successResponse } from "../utils/responseHandler";

export const findAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.findAll();
    successResponse(res, 200, "Users retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};
