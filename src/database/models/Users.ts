import { Model, DataTypes } from "sequelize";
import db from "./index"; // ajuste para o seu path real


class User extends Model {
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare birth: Date;
  declare cpf: string;
  declare email: string;
  declare phone: string;
  declare nameStreet: string;
  declare neighborhood: string;
  declare complement: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isValidCPF(value: string) {
        const regex = /^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!regex.test(value)) {
          throw new Error("CPF inválido");
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nameStreet: {
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
    allowNull: true
  }
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
  underscored: true
});


export default User;
