module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define(
        'Questions', {
        questions: {
            type: DataTypes.STRING
        },
        correctAnswer: {
            type: DataTypes.STRING
        },
        answer1: {
            type: DataTypes.STRING
        },
        answer2: {
            type: DataTypes.STRING
        },
        answer3: {
            type: DataTypes.STRING
        },
        answer4: {
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
        tableName: 'questions',
    });
    // Questions.associate = function (models) {
    //     Categories.hasMany(models.Products)
    // };
    return Questions;
}