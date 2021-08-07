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
        price: {
            type: DataTypes.FLOAT(10, 3).UNSIGNED,
            allowNull: false,
        },
        descriptions: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        numOfSold: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
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
        Products.belongsTo(models.Categories, {
            targetKey: 'id',
            foreignKey: 'categoryId',
        })
    };
    return Products;
}