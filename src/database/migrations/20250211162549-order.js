'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('orders', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        purchase_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        total_price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        discount: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        shopping_address: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled'),
          allowNull: false,
          defaultValue: 'pending'
        },
        payment_method: {
          type: Sequelize.ENUM('credit_card', 'debit_card', 'pix', 'paypal'),
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders')
  }
};
