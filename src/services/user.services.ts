import { CreationAttributes, ModelStatic } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/Users";
import resp from "../utils/resp";
import { secret, options } from "../config/jwtConfig";

class UserServices {
  private model: ModelStatic<User> = User;

  async get() {
    const users = await this.model.findAll();
    return resp(200, users);
  }

  async getById(id: number) {
    const user = await this.findById(id);
    if (!user) {
      return resp(404, "Usuário não encontrado!");
    }
    return resp(200, user);
  }

  async create(user: CreationAttributes<User>) {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      return resp(400, "Email já cadastrado!");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.model.create({ ...user, password: hashedPassword });
    return resp(201, newUser);
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return resp(404, "Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return resp(401, "Senha incorreta!");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
    return resp(200, { message: "Login bem-sucedido!", token });
  }

  async update(id: number, user: Partial<User>) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return resp(404, "Usuário não encontrado!");
    }

    await this.model.update(user, { where: { id } });
    const updatedUser = await this.model.findByPk(id);
    return resp(200, updatedUser);
  }

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
