import { ModelStatic } from "sequelize";
import resp from "../utils/resp";
import Purchases from "../database/models/Purchases";

class PurchaseService {
    private model: ModelStatic<Purchases> = Purchases

    //busca por todos as compras 
    async get(){
        const purchases = await this.model.findAll()
        return resp(200, purchases)
    }

    //busca por uma compra especifica
    async getByID(id: number){
        const purchase = await this.model.findByPk(id)
        return resp(200, purchase)
    }
    
    // atualiza uma compra 
    async update(id: number, purchase: Purchases){
        await this.model.update(purchase, 
            {where: {id: id}}
        )
        const updatepurchase = await this.model.findByPk(id)
        return resp(200, updatepurchase)
    }

    // deletando uma compra 
    async delete(id: number){
        const deletepurchase = await this.model.destroy({
            where: {id: id}
        })
        return resp(200, deletepurchase)
    }
}

export default PurchaseService