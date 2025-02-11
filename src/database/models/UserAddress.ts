import { Model, DataType, DataTypes, } from "sequelize";
import db from './index'

class UserAddress extends Model {
    declare id: number;
    declare user_id: number;
    declare name_street: string;
    declare neighborhood: string;
    declare complement: string;
}

UserAddress.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    name_street: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_street'
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    tableName: 'user_address',
    timestamps: false,
    underscored: true
})

export default UserAddress