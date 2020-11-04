const {Sequelize, DataTypes} = require("sequelize")
const sequelize = new Sequelize({dialect: "sqlite", storage: `${process.cwd()}/database.db`, logging: false})
sequelize.authenticate().then(() => console.log("DB connected!")).catch(err => console.log("DB not connected: " + err))

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

balance.sync().then(() => console.log("Balances synced!")).catch(err => console.log("Balances not synced: " + err))
prefixes.sync().then(() => console.log("Prefixes synced!")).catch(err => console.log("Prefixes not synced: " + err))
embColors.sync().then(() => console.log("Colors synced!")).catch(err => console.log("Colors not synced: " + err))
support.sync().then(() => console.log("Support synced!")).catch(err => console.log("Support not synced: " + err))