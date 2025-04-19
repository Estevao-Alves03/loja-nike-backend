import { CreationAttributes, ModelStatic } from "sequelize";
import resp from "../utils/resp";
import Contact from "../database/models/Contacts";
import OrderController from "../controller/order.controller";
import Orders from "../database/models/Orders";

class ContactServices {
    private model: ModelStatic<Contact> = Contact

    //busca todos os contatos de clientes
    async get(){
        const contacts = await this.model.findAll()
        return resp(200, contacts)
    }

    //busca por um contato especifico usando o id
    async getById(id: number){
        const contact = await this.model.findByPk(id)
        return resp(200, contact)
    }

    // cria um novo contato de cliente
    async create(contact: CreationAttributes<Contact>){
        const newcontact = await this.model.create(contact)
        return resp(201, newcontact)
    }

    // atualiza um contato de um cliente 
    async uptade(id: number, contact: Contact){
        await this.model.update(contact,
            {where: {id: id}}
        )
        const updatecontact = await this.model.findByPk(id)
        return resp(200, updatecontact)
    }

    //deletando um contato de um cliente
    async delete(id: number){
        const deletecontact = await this.model.destroy({
            where: {id: id}
        })
        return resp(200, deletecontact)
    }

    async deleteAll(){
        await Orders.destroy({where: {}})
    }
}

export default ContactServices