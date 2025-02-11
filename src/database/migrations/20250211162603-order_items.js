'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('order_items', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },  
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'cod_product'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('order_items')
  }
};
