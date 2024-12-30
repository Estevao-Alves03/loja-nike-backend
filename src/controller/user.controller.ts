import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user.services";

class UserController {
    private service = new UserServices()

    //busca todos os usuarios
    async get(req: Request, res: Response, next: NextFunction) {
    try {
        const {status, message} = await this.service.get()
        res.status(status).json(message)
    } catch (error) {
        next(error)
    }
    }

    //busca usuarios pelo id
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {status, message} = await this.service.getById(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //cria um novo usuario
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.create(req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //atualiza um usuario pelo id
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.update(Number(req.params.id), req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    //deleta um usuario pelo id
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.delete(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default UserController