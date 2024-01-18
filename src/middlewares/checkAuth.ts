import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET ?? "9vCo4";

interface DecodedToken {
  email: string;
  id: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization ?? "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken;

      req.userId = decoded.id;

      next();
    } catch (error) {
      return res.status(403).json("Access denied");
    }
  } else {
    return res.status(403).json("Access denied");
  }
};
