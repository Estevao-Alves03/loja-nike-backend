import { CreationAttributes, ModelStatic } from "sequelize";
import resp from "../utils/resp";
import Orders from "../database/models/Orders";

class OrderService {
    private model: ModelStatic<Orders> = Orders

    // busca todos os pedidos
    async get() {
        try {
            const orders = await Orders.findAll(); // Busca todos os pedidos

            return {
                status: 200,
                data: orders, // Alteramos de `message` para `data`
            };
        } catch (error) {
            return {
                status: 500,
                data: { message: "Erro ao buscar pedidos" },
            };
        }
    }

    // busca um pedido pelo id
    async getOrderById(id: number){
        const order = await this.model.findByPk(id)
        return resp(200, order)
    }

    // cria um novo pedido
    async create(order: CreationAttributes<Orders>){
        const newOrder = await this.model.create(order)
        return resp(201, newOrder)
    }

    // atualiza um pedido
    async update(id: number, order: Orders){
    const updateOrder = await this.model.update(order, {where: {id: id}})
        return resp(200, updateOrder)
    }

    // deletando um pedido
    async destroy(id: number){
       const deleteOrder = await this.model.destroy({where: {id:id}})
       return resp(200, deleteOrder)
    }

    async deleteAll() {
        await Orders.destroy({ where: {} }); 
      }
      
}

export default OrderService