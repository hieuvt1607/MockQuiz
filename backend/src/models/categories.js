module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define(
        'Categories', {
        categoryName: {
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
        tableName: 'categories',
    });
    Categories.associate = function (models) {
        Categories.hasMany(models.Products)
    };
    return Categories;
}