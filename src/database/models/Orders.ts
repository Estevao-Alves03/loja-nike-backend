import { Model, DataTypes } from "sequelize";
import db from './index'


class Orders extends Model {
    declare id: number;
    declare purchase_date: Date;
    declare total_price: number;
    declare discount: number;
    declare shopping_address: string;
    declare status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled';
    declare payment_method: 'credit_card'| 'debit_card' | 'pix' | 'paypal';
    declare user_id: number;
}

Orders.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'purchase_date'
    },
    total_price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'total_price'
    },
    discount: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    shopping_address: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'shopping_address'
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_method: {
        type: DataTypes.ENUM('credit_card', 'debit_card', 'pix', 'paypal'),
        allowNull: false,
        field: 'payment_method'
    },
    user_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize:db,
    tableName: 'orders',
    timestamps: false,
    underscored: true
})

export default Orders