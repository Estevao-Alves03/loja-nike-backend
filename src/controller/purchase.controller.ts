import { NextFunction, request, Request, Response } from "express";
import PurchaseService from "../services/purchase.services";

class PurchaseController {
    private service = new PurchaseService()


    //buscando todas as compras 
    async get(req: Request, res: Response, next: NextFunction){
       try {
        const {status, message} = await this.service.get()
        res.status(status).json(message)
       } catch (error) {
        next(error)
       }
    }

    //buscando as compras por id 
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.getByID(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }


    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.update(Number(req.params.id), req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.delete(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default PurchaseController