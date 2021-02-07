module.exports = function embColors(sequelize){
    const {DataTypes} = require("sequelize")
    return sequelize.define("color", {
        userID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
}