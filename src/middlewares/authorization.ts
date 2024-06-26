import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/ForbiddenError";

export const authorization = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      if (!user) {
        throw new ForbiddenError("User not authenticated");
      }

      const userRoles = user.roles.map(
        (role: { role_name: string }) => role.role_name
      );


      const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasPermission) {
        throw new ForbiddenError(
          "You don't have permission to access this route"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
