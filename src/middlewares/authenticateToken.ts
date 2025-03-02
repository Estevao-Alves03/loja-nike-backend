import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    console.log(`🔍 Middleware de autenticação chamado para: ${req.method} ${req.path}`);
  
    const token = req.headers.authorization?.split(" ")[1];
    console.log("🔹 Token recebido:", token);
  
    if (!token) {
      console.log("❌ Token não fornecido");
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log("✅ Token válido:", decoded);
      
      req.user = decoded;
      next();
    } catch (error) {
      console.log("❌ Token inválido:", error);
      res.status(401).json({ message: "Token inválido" });
    }
  };
  
