import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import UnauthorizeError from "../errors/UnauthorizeError";
import { IRoles } from "../dtos/roleDTO";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizeError("No token provided");
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, user) => {
      if (err) {
        throw new UnauthorizeError("Invalid token");
      }

      const { id, roles } = user as { id: string; roles: IRoles[] };
      const data = {
        id,
        roles,
      };
      res.locals.user = data;
      next();
    });
  } catch (error) {
    next(error);
  }
};
