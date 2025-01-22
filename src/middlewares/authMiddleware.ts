import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware para verificar o token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  jwt.verify(token, "seu-segredo-super-seguro", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    // Adiciona os dados decodificados à requisição (para usar posteriormente)
    req.user = decoded as JwtPayload;
    next();
  });
}

export default authenticateToken;
