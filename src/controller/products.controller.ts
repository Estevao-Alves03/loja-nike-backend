import { NextFunction, Request, Response } from "express";
import ProductServices from "../services/products.services";

class ProductController {
    private service = new ProductServices()

    //buscando todos os produtos 
    async get(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.get()
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //buscando pelo id do produto 
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.getById(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //cria um novo produto 
    async create(req: Request, res: Response, next:  NextFunction){
        try {
            const {status, message} = await this.service.create(req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //atualiza um produto 
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.update(Number(req.params.id), req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //deletando um produto
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.delete(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }











}

export default ProductController