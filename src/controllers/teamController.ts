import { Request, Response, NextFunction } from "express";
import * as TeamService from "../services/teamService";
import { successResponse } from "../utils/responseHandler";
import ValidationError from "../errors/ValidationError";
import { z } from "zod";
import { createTeamSchema } from "../validations/teamValidation";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await TeamService.findAll();
    successResponse(res, 200, "Teams retrieved successfully", response);
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
    const response = await TeamService.findOne(id);
    successResponse(res, 200, "Team retrieved successfully", response);
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
    const data = createTeamSchema.parse(req.body);
    const response = await TeamService.create(data);
    successResponse(res, 201, "Team created successfully", response);
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
    const data = createTeamSchema.parse(req.body);
    const response = await TeamService.update(id, data);
    successResponse(res, 200, "Team updated successfully", response);
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
    const response = await TeamService.remove(id);
    successResponse(res, 200, "Team deleted successfully", response);
  } catch (error) {
    next(error);
  }
};
