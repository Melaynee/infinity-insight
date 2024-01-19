import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: string[] = errors
      .array()
      .map((error: ValidationError) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

export default validationErrorHandler;
