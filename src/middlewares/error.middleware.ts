import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const stack = process.env.NODE_ENV === "production" ? null : err.stack;

  res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
}
