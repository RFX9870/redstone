module.exports = function(sequelize){
    const {DataTypes} = require("sequelize")
    global.langs = sequelize.define("lang", {
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
    langs.sync().then(() => console.log("Langs synced!")).catch(err => console.log("Langs not synced: " + err))
}