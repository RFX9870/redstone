module.exports = function langs(sequelize){
    const {DataTypes} = require("sequelize")
    return sequelize.define("lang", {
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