module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.support = sequelize.define("support",{
        userID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        channelID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
    support.sync().then(() => console.log("Support synced!")).catch(err => console.log("Support not synced: " + err))
}