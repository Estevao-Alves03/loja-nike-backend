import { Model, DataTypes, fn } from "sequelize";
import db from "./index"; // ajuste para o seu path real

class Purchases extends Model {
  declare id: number;
  declare purchaseDate: Date;
  declare quantity: number;
  declare totalPrice: number;
  declare status: string;
  declare shippingAddress: string;
  declare paymentMethod: string;
  declare userId: number;
  declare codProduct: number;
}

Purchases.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id'
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: fn('NOW'),
    field: 'purchase_date'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_price'
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'canceled'),
    defaultValue: 'pending'
  },
  shippingAddress: {
    type: DataTypes.TEXT,
    field: 'shipping_address'
  },
  paymentMethod: {
    type: DataTypes.ENUM('creditCard', 'debitCard', 'paypal', 'pix'),
    allowNull: false,
    field: 'payment_method'
  },
  userId: {
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
  codProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cod_product',
    references: {
      model: 'products',
      key: 'cod_product'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  sequelize: db,
  tableName: 'purchases',
  timestamps: false,
  underscored: true
});


export default Purchases;
