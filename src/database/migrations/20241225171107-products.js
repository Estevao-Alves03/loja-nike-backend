'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      cod_product: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
      // Se precisar de mais colunas, adicione aqui
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};
