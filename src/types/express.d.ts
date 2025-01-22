import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // O token pode ser um objeto JwtPayload ou uma string
    }
  }
}
