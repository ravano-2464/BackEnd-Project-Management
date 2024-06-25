import { NextFunction, Request, Response } from "express";
import * as RoleService from "../services/roleService";
import { successResponse } from "../utils/responseHandler";
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RoleService.findAll();
    successResponse(res, 200, "Roles retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};
