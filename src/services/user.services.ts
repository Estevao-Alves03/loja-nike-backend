import { CreationAttributes, ModelStatic } from "sequelize";
import { secret, options } from "../config/jwtConfig";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/Users";
import UserAddress from "../database/models/Address";
import resp from "../utils/resp";

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
async create(user: CreationAttributes<User> & { address: CreationAttributes<UserAddress> }) {
  const sequelizeInstance = User.sequelize; // Obtém a instância do Sequelize
  if (!sequelizeInstance) {
    return resp(500, "Erro interno: instância do Sequelize não encontrada.");
  }

  const transaction = await sequelizeInstance.transaction(); // Inicia a transação
  try {
    // Verifica se o email já existe
    const existingUser = await User.findOne({ where: { email: user.email }, transaction });
    if (existingUser) {
      await transaction.rollback();
      return resp(400, "Email já cadastrado!");
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // Cria o usuário na tabela `users`
    const newUser = await User.create(
      { ...user, password: hashedPassword },
      { transaction }
    );

    // Cria o endereço na tabela `user_address` e associa ao usuário recém-criado
    const newAddress = await UserAddress.create(
      { ...user.address, userId: newUser.id }, 
      { transaction }
    );

    // Confirma a transação
    await transaction.commit();
    return resp(201, { user: newUser, address: newAddress });

  } catch (error) {
    await transaction.rollback(); 
    console.error("Erro ao criar usuário e endereço:", error);
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