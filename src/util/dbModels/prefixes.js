module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.prefixes = sequelize.define("prefix",{
        serverID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        freezeTableName: true
    })
    prefixes.sync().then(() => console.log("Prefixes synced!")).catch(err => console.log("Prefixes not synced: " + err))
}