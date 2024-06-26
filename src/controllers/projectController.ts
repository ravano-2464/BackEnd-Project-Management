import { Request, Response, NextFunction } from "express";
import * as ProjectService from "../services/projectService";
import { successResponse } from "../utils/responseHandler";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/projectValidation";
import ValidationError from "../errors/ValidationError";
import { z } from "zod";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await ProjectService.findAll();
    successResponse(res, 200, "Projects retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};

export const findAllByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const response = await ProjectService.findAllByUser(id);
    successResponse(res, 200, "Projects retrieved successfully", response);
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
    const response = await ProjectService.findOne(id);
    successResponse(res, 200, "Project retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};

export const findOneByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const { projectId } = req.params;
    const response = await ProjectService.findOneByUser(id, projectId);
    successResponse(res, 200, "Project retrieved successfully", response);
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
    const data = createProjectSchema.parse(req.body);
    const response = await ProjectService.create(data);
    successResponse(res, 201, "Project created successfully", response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(
        new ValidationError(
          error.errors[0].message,
          error.errors[0].path.join(".")
        )
      );
    }
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
    const data = updateProjectSchema.parse(req.body);
    const response = await ProjectService.update(id, data);
    successResponse(res, 200, "Project updated successfully", response);
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
    const response = await ProjectService.remove(id);
    successResponse(res, 200, "Project removed successfully", response);
  } catch (error) {
    next(error);
  }
};
