import { NextFunction, Request, Response } from "express";
import ContactServices from "../services/contacts.services";

class ContactController {
    private service = new ContactServices()

    //busca todos os contatos
    async get(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.get()
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // busca por um contato especifico usando o id
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.getById(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // cria um novo contato de cliente
    async post(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.create(req.body)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    // atualiza um contato de um cliente 
    async update(req: Request, res: Response, next: NextFunction){
        try {
        const {status, message} = await this.service.uptade(Number(req.params.id), req.body)
        res.status(status).json(message)
        } catch (error) {
           next(error) 
        }
    }

    // deleta um contato de um cliente 
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.delete(Number(req.params.id))
            res.status(status).json(message)
        } catch (error) { 
           next(error) 
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction){
        await this.service.deleteAll()
        res.status(200).json({message: "todos os contatos foram excluidos com sucesso"})
    }
}

export default ContactController