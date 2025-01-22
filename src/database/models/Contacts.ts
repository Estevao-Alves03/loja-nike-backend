import { Model, DataTypes } from "sequelize";
import db from './index'

class Contacts extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare birthDate: Date;
    declare message: string;
}

Contacts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull:false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      }
}, {
    sequelize: db,
    tableName: 'contacts',
    timestamps: false,
    underscored: true
})

export default Contacts