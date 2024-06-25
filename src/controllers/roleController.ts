import { NextFunction, Request, Response } from "express";
import * as RoleService from "../services/roleService";
import { successResponse } from "../utils/responseHandler";
import ValidationError from "../errors/ValidationError";
import { z } from "zod";
import { createRoleSchema } from "../validations/roleValidation";
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

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await RoleService.findOne(id);
    successResponse(res, 200, "Role retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await RoleService.remove(id);
    successResponse(res, 200, "Role deleted successfully", response);
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
    const data = createRoleSchema.parse(req.body);
    const response = await RoleService.create(data);
    successResponse(res, 201, "Role created successfully", response);
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = createRoleSchema.parse(req.body);
    const response = await RoleService.update(id, data);
    successResponse(res, 200, "Role updated successfully", response);
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
