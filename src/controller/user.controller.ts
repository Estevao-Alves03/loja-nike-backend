import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret, options } from "../config/jwtConfig";
import UserServices from "../services/user.services";
import User from "../database/models/Users";

class UserController {
  private service = new UserServices();

  // Busca todos os usuários
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  // Busca usuário pelo ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getById(Number(req.params.id));
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  // Registro de usuário
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, lastname, email, password } = req.body;
  
    try {
      const existingUser = await this.service.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "Usuário já cadastrado!" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const { message: user } = await this.service.create({
        name,
        lastname,
        email,
        password: hashedPassword,
      }) as { status: number; message: User };
  
      const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
  
      res.status(201).json({ message: "Usuário registrado com sucesso!", token });
    } catch (error) {
      next(error);
    }
  }
  
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
  
    try {
      const user = await this.service.findByEmail(email);
      if (!user) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Senha incorreta!" });
        return;
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
  
      res.json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      next(error);
    }
  }
  

  // Atualiza um usuário pelo ID
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.update(Number(req.params.id), req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  // Deleta um usuário pelo ID
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.delete(Number(req.params.id));
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
