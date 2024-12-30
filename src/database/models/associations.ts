import Users from "./Users";
import Products from "./Products";
import Purchases from "./Purchases";

Users.hasMany(Purchases, {foreignKey: 'user_id', as: 'purchases'})
Purchases.belongsTo(Users, {foreignKey: 'user_id', as: 'users'})
Purchases.belongsTo(Products, {foreignKey: 'cod_product', as: 'products' })

export default {
    Users,
    Purchases,
    Products
}