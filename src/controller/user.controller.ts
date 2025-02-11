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
      const { status, message } = await this.service.getById(
        Number(req.params.id)
      );
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  // Registro de usuário
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      name,
      lastname,
      email,
      password,
      confirmPassword,
      cpf,
      birth,
      nameStreet,
      complement,
      phone,
      neighborhood,
    } = req.body;
  
    try {
      if (
        !name ||
        !lastname ||
        !email ||
        !password ||
        !confirmPassword ||
        !cpf ||
        !birth ||
        !nameStreet ||
        !phone ||
        !neighborhood
      ) {
        res
          .status(400)
          .json({
            message: "Todos os campos obrigatórios devem ser preenchidos!",
          });
        return;
      }
  
      if (password !== confirmPassword) {
        res.status(400).json({ message: "As senhas não coincidem!" });
        return;
      }
  
      const existingUser = await this.service.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "Usuário já cadastrado!" });
        return;
      }
  
      console.log("Criando usuário no banco...");
  
      // Criar novo usuário no banco sem criptografar a senha aqui
      const { message: user } = (await this.service.create({
        name,
        lastname,
        email,
        password, // Deixe a senha normal, pois será criptografada dentro do create()
        cpf,
        birth,
        nameStreet,
        complement: complement || "",
        phone,
        neighborhood,
      })) as { status: number; message: User };
  
      console.log("Usuário salvo no banco:", user);
  
      const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
  
      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso!", token });
    } catch (error) {
      console.error("Erro no registro:", error);
      next(error);
    }
  }
  

  // faz autenticaçao(login)
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;

    try {
      const user = await this.service.findByEmail(email);
      if (!user) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }

      console.log("Senha digitada pelo usuário:", password);
      console.log("Senha armazenada no banco:", user.password);

      // Verifica manualmente se a senha é válida
      bcrypt.compare(password, user.password)
        .then(result => console.log("Senha correta?", result))
        .catch(err => console.error("Erro ao comparar senha:", err));

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Senha incorreta!" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        options
      );

      res.status(200).json({
        message: "Login bem-sucedido!",
        data: { token: token, user: user },
      });
    } catch (error) {
      next(error);
    }
}


  // Atualiza um usuário pelo ID
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.update(
        Number(req.params.id),
        req.body
      );
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  // Deleta um usuário pelo ID
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.delete(
        Number(req.params.id)
      );
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;