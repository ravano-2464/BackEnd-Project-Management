import { Request, Response } from "express";
import * as UserService from "../services/userService";

export const findAll = async (req: Request, res: Response) => {
  try {
    const response = await UserService.findAll();
    return res.send({ message: "Hello World" });
  } catch (error) {}
};
