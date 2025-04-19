import { CreationAttributes, ModelStatic } from "sequelize";
import resp from "../utils/resp";
import Product from "../database/models/Products";
import Orders from "../database/models/Orders";

class ProductServices {
    private model: ModelStatic<Product> = Product

    //busca todos os produtos
    async get(){
        const products = await this.model.findAll()
        return resp(200, products)
    }

    //busca produtos pelo id 
    async getById(id: number){
        const product = await this.model.findByPk(id)
        return resp(200, product)
    }

    //cria um novo produto 
    async create(product: CreationAttributes<Product>){
        const newproduct = await this.model.create(product)
        return resp(201, newproduct)
    }

    //atualiza um produto 
    async update(id: number, product: Product){
        await this.model.update(product,
            {where: {cod_product: id}}
        )
        const updateproduct = await this.model.findByPk(id)
        return resp(200, updateproduct)
    }

    //deleta um produto
    async delete(id: number){
        const deleteproduct = await this.model.destroy(
            {where: {cod_product: id}}
        )
        return resp(200, deleteproduct)
    }

    async deleteAll(){
        await Orders.destroy({where: {}})
    }
}

export default ProductServices