const {Sequelize} = require("sequelize")
const fs = require("fs")
const sequelize = new Sequelize({dialect: "sqlite", storage: `./database.db`, logging: false})
sequelize.authenticate().then(() => console.log("DB connected!")).catch(err => console.log("DB not connected: " + err))

const models = fs.readdirSync("./src/util/dbModels").filter(f => f.endsWith(".js"))
for(const model of models){
    require(`./dbModels/${model}`)(sequelize)
}