module.exports = (sequelize, DataTypes) => {
    const ScoreBoard = sequelize.define(
        'ScoreBoard', {
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER(10).UNSIGNED,
        },
        score: {
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
        tableName: 'score_board',
    });

    return ScoreBoard;
}