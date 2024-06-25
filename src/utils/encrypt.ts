import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
export const encryptPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePass = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
