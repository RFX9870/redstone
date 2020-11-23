module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.embColors = sequelize.define("color", {
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
    embColors.sync().then(() => console.log("Colors synced!")).catch(err => console.log("Colors not synced: " + err))
}