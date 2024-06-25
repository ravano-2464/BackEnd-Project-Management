import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/userService";
import { successResponse } from "../utils/responseHandler";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation";
import { z } from "zod";
import ValidationError from "../errors/ValidationError";

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

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createUserSchema.parse(req.body);
    const response = await UserService.create(data);
    successResponse(res, 201, "User created successfully", response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(
        new ValidationError(
          error.errors[0].message,
          error.errors[0].path.join(".")
        )
      );
    } else {
      next(error);
    }
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await UserService.findOne(id);
    successResponse(res, 200, "User retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = updateUserSchema.parse(req.body);
    const response = await UserService.update(id, data);
    successResponse(res, 200, "User updated successfully", response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(
        new ValidationError(
          error.errors[0].message,
          error.errors[0].path.join(".")
        )
      );
    } else {
      next(error);
    }
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await UserService.remove(id);
    successResponse(res, 200, "User deleted successfully", response);
  } catch (error) {
    next(error);
  }
};
