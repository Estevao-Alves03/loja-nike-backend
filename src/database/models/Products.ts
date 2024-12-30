import { Model, DataTypes } from "sequelize";
import db from "./index"

class Products extends Model {
  declare codProduct: number;
  declare nameProduct: string;
}

Products.init({
  codProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nameProduct: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'products',
  timestamps: false,
  underscored: true
});

export default Products;
