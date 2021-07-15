module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        'Products', {
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER(10).UNSIGNED,
        },
        productName: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
    }, {
        tableName: 'products',
    });
    Products.associate = function (models) {
        Products.belongsTo(models.Categories,{
            targetKey: 'id',
            foreignKey: 'categoryId',
        })
    };
    return Products;
}