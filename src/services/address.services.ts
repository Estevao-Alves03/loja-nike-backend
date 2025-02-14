import { CreationAttributes, ModelStatic } from "sequelize";
import resp from "../utils/resp";
import Address from "../database/models/Address";

class AddressServices {
    private model: ModelStatic<Address> = Address;

    // Buscar todos os endereços
    async getAll() {
        const addresses = await this.model.findAll();
        return resp(200, addresses);
    }

    // Buscar endereço pelo ID do usuário
    async getByUserId(userId: number) {
        const address = await this.model.findOne({ where: { userId } });
        return resp(200, address);
    }

    // Criar um novo endereço
    async create(address: CreationAttributes<Address>) {
        const newAddress = await this.model.create(address);
        return resp(201, newAddress);
    }

    // Atualizar um endereço pelo ID do usuário
    async update(userId: number, address: Partial<CreationAttributes<Address>>) {
        await this.model.update(address, { where: { userId } });
        const updatedAddress = await this.model.findOne({ where: { userId } });
        return resp(200, updatedAddress);
    }

    // Deletar um endereço pelo ID do usuário
    async delete(userId: number) {
        const deletedAddress = await this.model.destroy({ where: { userId } });
        return resp(200, deletedAddress);
    }
}

export default AddressServices;
