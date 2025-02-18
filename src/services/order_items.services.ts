import { CreationAttributes, ModelStatic } from "sequelize";
import resp from "../utils/resp";
import OrderItems from "../database/models/OrderItems";

class OrderItemsService {
    private model: ModelStatic<OrderItems> = OrderItems;

    // busca todos
    async get() {
        const orderItems = await this.model.findAll();
        return resp(200, orderItems);
    }

    // busca por id
    async getById(id: number) {
        const orderItem = await this.model.findByPk(id);
        if (!orderItem) return resp(404, { message: "Item do pedido não encontrado" });
        return resp(200, orderItem);
    }

    // cria
    async create(order: CreationAttributes<OrderItems>) {
        const newOrderItem = await this.model.create(order);
        return resp(201, newOrderItem);
    }

    // atualiza
    async update(id: number, order: Partial<CreationAttributes<OrderItems>>) {
        const orderItem = await this.model.findByPk(id);
        if (!orderItem) return resp(404, { message: "Item do pedido não encontrado" });

        await orderItem.update(order);
        return resp(200, orderItem);
    }

    // deleta
    async destroy(id: number) {
        const orderItem = await this.model.findByPk(id);
        if (!orderItem) return resp(404, { message: "Item do pedido não encontrado" });

        await orderItem.destroy();
        return resp(200, { message: "Item do pedido excluído com sucesso!" });
    }
}

export default OrderItemsService;
