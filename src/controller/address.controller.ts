import { NextFunction, Request, Response } from "express";
import AddressServices from "../services/address.services";

class AddressController {
    private service = new AddressServices();

    // Buscar todos os endereços
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getAll();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    // Buscar endereço pelo ID do usuário
    async getByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getByUserId(Number(req.params.userId));
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    // Criar um novo endereço
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.create(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    // Atualizar um endereço pelo ID do usuário
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.update(Number(req.params.userId), req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    // Deletar um endereço pelo ID do usuário
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.delete(Number(req.params.userId));
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction){
        await this.service.deleteAll()
        res.status(200).json({message: "todos os endereços foram excluidos com sucesso"})
    }
}

export default AddressController;
