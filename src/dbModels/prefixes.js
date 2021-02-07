module.exports = function prefixes(sequelize){
    const {DataTypes} = require("sequelize")
    return sequelize.define("prefix",{
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
}