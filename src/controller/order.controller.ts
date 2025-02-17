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
    async create(req: Request, res: Response, next: NextFunction){
        console.log("dados recebidos do payment", req.body)
        try {
            const {userId, totalPrice, discount, paymentMethod, cartItems} = req.body
            
            const userAddress = await Address.findOne({where: {user_id: userId}})

            if(!userAddress){
               return res.status(400).json({message: "endereço do usuario nao encontrado"})
            }

            const newOrder = await Orders.create({
                user_id: userId,
                total_price: totalPrice,
                discount: discount,
                payment_method: paymentMethod,
                shopping_address: `${userAddress.name_street}, ${userAddress.neighborhood}, ${userAddress.complement || ''}`,
                status: "peding",
            })

            const orderItemsData = cartItems.map((item: any) => ({
                order_id: newOrder.id,
                product_id: item.cod_product,
                quantity: item.quantity,
            }))

            await OrderItems.bulkCreate(orderItemsData)

            res.status(201).json({message: "pedido criado com sucesso!", order: newOrder})
        } catch (error) {
            next(error)
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