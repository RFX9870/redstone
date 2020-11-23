module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.balance = sequelize.define("balance",{
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
    balance.sync().then(() => console.log("Balances synced!")).catch(err => console.log("Balances not synced: " + err))
}