'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER(10).UNSIGNED,
            },
            productName: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            createdBy: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedBy: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('products');
    }
};
