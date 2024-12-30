import { CreationAttributes, ModelStatic } from "sequelize";
import User from "../database/models/Users";
import resp from "../utils/resp";

class UserServices {
    private model: ModelStatic<User> = User

    //busca todos os usuarios
    async get() {
        const users = await this.model.findAll()
        return resp(200, users)
    }

    //busca usuarios pelo id 
    async getById(id: number) {
        const user = await this.model.findByPk(id)
        if (!user) {
            return resp(404, "Usuário não encontrado");
          }
          return resp(200, user);
        }

    //cria um novo usuario
    async create(user: CreationAttributes<User>) {
        const newUser = await this.model.create(user)
        return resp(201, newUser)
    }


    //atualiza um usuario pelo id 
    async update (id: number, user: User){
        await this.model.update(user, {
            where: {id: id },
        });
        const updatedUser = await this.model.findByPk(id);
        return resp(200, updatedUser)
    }

    //deleta um usuario pelo id
    async delete(id: number) {
        const deleteuser = await this.model.destroy({
            where: {id: id}
        })
        if (deleteuser === 0) {
            return resp(404, "Usuário não encontrado");
          }
          return resp(200, `Usuário com ID ${id} deletado`);
        }
}

export default UserServices