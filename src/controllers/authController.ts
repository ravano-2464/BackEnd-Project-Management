import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/authService";
import { successResponse } from "../utils/responseHandler";
import ValidationError from "../errors/ValidationError";
import { loginSchema } from "../validations/authValidation";
import { z } from "zod";
import { access } from "fs";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);
    const response = await AuthService.login(data);
    successResponse(res, 200, "User logged in successfully", {
      accessToken: response,
    });
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

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    const response = await AuthService.me(user.id);
    successResponse(res, 200, "User retrieved successfully", response);
  } catch (error) {
    next(error);
  }
};
