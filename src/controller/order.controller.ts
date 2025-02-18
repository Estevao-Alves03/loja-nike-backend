import { Request, Response, NextFunction} from "express";
import OrderService from "../services/order.services";
import Orders from "../database/models/Orders";
import Address from "../database/models/Address";
import OrderItems from "../database/models/OrderItems";

class OrderController {
    private service = new OrderService()

    // busca todos os pedidos
    async get(req: Request, res: Response, next: NextFunction){
        try {
             const{status, message} = await this.service.get()
             res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // busca um pedido pelo id
    async getOrderById(req: Request, res: Response, next: NextFunction){
        try {
            const{status, message} = await this.service.getOrderById(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
// cria um novo pedido 
async create(req: Request, res: Response, next: NextFunction) {
    console.log("📦 Dados recebidos do payment:", req.body);

    try {
        const { user_id: userId, total_price: totalPrice, discount, payment_method: paymentMethod, cart } = req.body;

        if (!userId || !totalPrice || !paymentMethod || !cart || cart.length === 0) {
            return res.status(400).json({ message: "Dados inválidos para criar o pedido." });
        }

        // Busca o endereço do usuário
        const userAddress = await Address.findOne({ where: { user_id: userId } });
        if (!userAddress) {
            return res.status(400).json({ message: "Endereço do usuário não encontrado" });
        }

        // Cria um novo pedido
        const newOrder = await Orders.create({
            user_id: userId,
            total_price: totalPrice,
            discount: discount,
            payment_method: paymentMethod,
            shopping_address: `${userAddress.name_street}, ${userAddress.neighborhood}, ${userAddress.complement || ''}`,
            status: "pending",
        });

        // Mapeia os itens do pedido e adiciona o `order_id`
        const orderItemsData = cart.map((item: any) => ({
            order_id: newOrder.id,  // FK para `Orders`
            product_id: item.cod_product,
            quantity: item.quantity,
        }));

        // Cria os itens do pedido no banco
        await OrderItems.bulkCreate(orderItemsData);

        res.status(201).json({
            message: "Pedido criado com sucesso!",
            order_id: newOrder.id, // Retornamos o `order_id`
        });
    } catch (error) {
        next(error);
    }
}


    // atualiza um novo pedido
    async update(req: Request, res: Response, next: NextFunction){
        try {
           const{status, message} = await this.service.update(Number(req.params.id), req.body)
           res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // deleta um pedido 
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const{status, message} = await this.service.destroy(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }


}

export default OrderController