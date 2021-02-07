module.exports = function balance(sequelize){
    const {DataTypes} = require("sequelize")
    return sequelize.define("balance",{
        userID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deposit: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
}