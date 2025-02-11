import { Model, DataTypes } from "sequelize";
import db from './index'

class OrderItems extends Model {
    declare id: number;
    declare order_id: number;
    declare product_id: number;
    declare quantity: number;
}

OrderItems.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id',
        references: {
            model: 'orders',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
        references: {
            model: 'products',
            key: 'cod_product'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize:db,
    tableName: 'order_items',
    timestamps: false,
    underscored: true
})

export default OrderItems