import { CreationAttributes, ModelStatic } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/Users";
import resp from "../utils/resp";
import { secret, options } from "../config/jwtConfig";

class UserServices {
  private model: ModelStatic<User> = User;

// busca todos
  async get() {
    const users = await this.model.findAll();
    return resp(200, users);
  }

// busca pelo id
  async getById(id: number) {
    const user = await this.findById(id);
    if (!user) {
      return resp(404, "Usuário não encontrado!");
    }
    return resp(200, user);
  }
// cria
async create(user: CreationAttributes<User>) {
  try {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      return resp(400, "Email já cadastrado!");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log("Senha criptografada antes de salvar:", hashedPassword);

    // Teste imediatamente antes de salvar no banco
    const isMatch = await bcrypt.compare(user.password, hashedPassword);
    console.log("A senha digitada confere com a hash gerada?", isMatch);

    const newUser = await this.model.create({ ...user, password: hashedPassword });

    return resp(201, newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return resp(500, "Erro interno ao criar usuário");
  }
}  
// fazer autenticaçao
async login(email: string, password: string) {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha incorreta!");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
  return { message: "Login bem-sucedido!", token };
}


// atualiza
  async update(id: number, user: Partial<User>) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return resp(404, "Usuário não encontrado!");
    }

    await this.model.update(user, { where: { id } });
    const updatedUser = await this.model.findByPk(id);
    return resp(200, updatedUser);
  }

//deleta
  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) {
      return resp(404, "Usuário não encontrado!");
    }

    await this.model.destroy({ where: { id } });
    return resp(200, `Usuário com ID ${id} deletado com sucesso!`);
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ where: { email } });
  }

  private async findById(id: number) {
    return await this.model.findByPk(id);
  }
}

export default UserServices;
