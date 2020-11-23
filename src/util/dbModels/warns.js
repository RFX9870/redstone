module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.warns = sequelize.define("warn", {
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
    warns.sync().then(() => console.log("Warns synced!")).catch(err => console.log("Warns not synced: " + err))
}