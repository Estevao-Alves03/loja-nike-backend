import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret, options } from "../config/jwtConfig";
import UserServices from "../services/user.services";
import User from "../database/models/Users";
import UserAddress from "../database/models/Address"; // Importação do modelo de endereço

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


  // registrando usuario e endereço
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("📥 Dados recebidos no backend:", req.body);
  
    const {
      name,
      lastname,
      email,
      password,
      confirm_password,
      cpf,
      birth,
      name_street,
      complement,
      phone,
      neighborhood,
    } = req.body;
  
    const confirmPassword = confirm_password;
    const nameStreet = name_street;
  
    try {
      if (
        !name || !lastname || !email || !password || !confirmPassword ||
        !cpf || !birth || !nameStreet || !phone || !neighborhood
      ) {
        res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos!" });
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
  
      const formattedBirth = new Date(birth).toISOString().split("T")[0];
  
      console.log("🔹 Criando usuário no banco...");
  
      // Criando usuário no banco de dados
      const newUser = await User.create({
        name,
        lastname,
        email,
        password: await bcrypt.hash(password, 10), // Criptografando a senha
        cpf,
        birth: formattedBirth,
        phone,
      });
  
      if (!newUser) {
        throw new Error("Erro ao criar usuário: ID não foi gerado");
      }
  
      console.log("✅ Usuário criado com sucesso:", newUser);
  
      // Criando o endereço vinculado ao usuário
      const newAddress = await UserAddress.create({
        user_id: newUser.id, // Passando o ID do usuário recém-criado
        name_street: nameStreet,
        complement: complement || "",
        neighborhood,
      });
  
      console.log("✅ Endereço salvo no banco:", newAddress);
  
      // Gerando token de autenticação
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, options);
  
      // 🔹 Retornando o ID do usuário na resposta para o frontend
      res.status(201).json({ 
        id: newUser.id, 
        message: "Usuário registrado com sucesso!", 
        token 
      });
  
    } catch (error) {
      console.error("❌ Erro no registro:", error);
      next(error);
    }
  }
  

  // Faz autenticação (login)
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;

    try {
      const user = await this.service.findByEmail(email);
      if (!user) {
        res.status(400).json({ message: "Usuário não encontrado!" });
        return;
      }

      console.log("🔹 Senha digitada pelo usuário:", password);
      console.log("🔹 Senha armazenada no banco:", user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Senha incorreta!" });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secret, options);

      res.status(200).json({
        message: "Login bem-sucedido!",
        data: { token, user },
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

  async deleteAll(req: Request, res: Response, next: NextFunction){
    await this.service.deleteAll()
    res.status(200).json({message: "todos os usuarios foram deletados"})
  }



}

export default UserController;