module.exports = function warns(sequelize){
    const {DataTypes} = require("sequelize")
    return sequelize.define("warn", {
        userID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        serverID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        modID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
}