import { Model, DataTypes } from "sequelize";
import db from "./index"

class Products extends Model {
  declare codProduct: number;
  declare nameProduct: string;
  declare price: number;
  declare description: string;
}

Products.init({
  cod_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name_product: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'products',
  timestamps: false,
  underscored: true
});

export default Products;
