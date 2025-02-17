import { Request, Response, NextFunction } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> // Permite retorno de qualquer tipo
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
