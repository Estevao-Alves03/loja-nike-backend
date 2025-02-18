import { Request, Response, NextFunction} from "express";
import OrderItemsService from "../services/order_items.services";
import OrderItems from "../database/models/OrderItems";

class OrderItemsController {
    private service = new OrderItemsService()

    // busca todos
    async get(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.get()
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // busca por id
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.getById(Number (req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // cria
    async create(req: Request, res: Response, next: NextFunction){
        try {
           const {status, message} = await this.service.create(req.body)
           res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // atualiza
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.update(Number(req.params.id), req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // deleta
    async destroy(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.destroy(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default OrderItemsController