const fs = require("fs")

module.exports = {
    commands(){
        const commands = fs.readdirSync("./src/commands").filter(f => f.endsWith(".js"))
        for(const command of commands) {
            const cmd = require(`./commands/${command}`)
            client.commands.set(cmd.name, cmd)
        }
    },
    langs(){
        const langs = fs.readdirSync("./src/langs").filter(f => f.endsWith(".js"))
        for(const lang of langs) {
            const lng = require(`./langs/${lang}`)
            client.langs.set(lng.name, lng)
        }
    },
    db(){
        const {Sequelize} = require("sequelize")
        client.sequelize = new Sequelize({dialect: "sqlite", storage: `./database.db`, logging: false})
        client.sequelize.authenticate().then(() => console.log("DB connected!")).catch(err => console.log("DB not connected: " + err))
        const models = fs.readdirSync("./src/dbModels").filter(f => f.endsWith(".js"))
        for(const model of models){
            const mod = require(`./dbModels/${model}`)
            global[mod.name] = mod(client.sequelize)
            global[mod.name].sync().then(() => console.log(`${mod.name} synced!`)).catch(error => console.log(`Error on syncing ${mod.name}: ${error}`))
        }
    },
    utils(){
        if(client.ready){
            const utils = fs.readdirSync("./src/util").filter(f => f.endsWith(".js"))
            for(const util of utils) require(`./util/${util}`)()
        }else{
            setTimeout(module.exports.utils, 1000)
        }
    },
    events_client(){
        const events = fs.readdirSync("./src/events/client").filter(f => f.endsWith(".js"))
        for(const event of events) {
            const ev = require(`./events/client/${event}`)
            client.on(ev.name, ev)
        }
    },
    events_process(){
        const events = fs.readdirSync("./src/events/process").filter(f => f.endsWith(".js"))
        for(const event of events) {
            const ev = require(`./events/process/${event}`)
            process.on(ev.name, ev)
        }
    }
}