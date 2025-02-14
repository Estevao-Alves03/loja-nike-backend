import Users from "./Users";
import Address from "./Address";
import Products from "./Products";
import OrderItems from "./OrderItems";
import Orders from "./Orders";

// um usuario tem um endereço, e um endereço pertence a um usuario
Users.hasOne(Address, { foreignKey: 'user_id', as: 'address' });
Address.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
//  um usuario pode ter varios pedidos, um pedido pertence a um usuario 
Users.hasMany(Orders, { foreignKey: 'user_id', as: 'orders'})
Orders.belongsTo(Users, { foreignKey: 'user_id', as: 'user'})
//  um pedido pode ter vários produtos e um produto pode estar em muitos pedidos
Orders.belongsToMany(Products, {through: OrderItems, foreignKey: 'order_id', as: 'products'})
Products.belongsToMany(Orders, {through: OrderItems, foreignKey: 'product_id', as: 'orders'})
//  um item de pedido pertence a um pedido e um produto
OrderItems.belongsTo(Orders, { foreignKey: 'order_id', as: 'order' });
OrderItems.belongsTo(Products, { foreignKey: 'product_id', as: 'product' });
// um pedido tem vários itens
Orders.hasMany(OrderItems, { foreignKey: "order_id", as: "items" });
// um produto pode estar em vários pedidos
Products.hasMany(OrderItems, { foreignKey: "product_id", as: "order_items" });

export default {
    Users,
    Products,
    OrderItems,
    Orders,
    Address
}