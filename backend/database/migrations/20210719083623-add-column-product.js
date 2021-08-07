'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'products',
        'price',
        {
          type: Sequelize.FLOAT(10, 3).UNSIGNED,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'products',
        'descriptions',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'products',
        'image',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'products',
        'isAvailable',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        }
      ),
      queryInterface.addColumn(
        'products',
        'numOfSold',
        {
          type: Sequelize.INTEGER(10).UNSIGNED,
          allowNull: false,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('products', 'price'),
      queryInterface.removeColumn('products', 'descriptions'),
      queryInterface.removeColumn('products', 'image'),
      queryInterface.removeColumn('products', 'isAvailable'),
      queryInterface.removeColumn('products', 'numOfSold'),
    ]);
  }
};
