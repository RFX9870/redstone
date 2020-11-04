module.exports = function(client){
    const fs = require("fs")
    client.commands = new Eris.Collection()
    const commandFiles = fs.readdirSync(`${process.cwd()}/src/commands`).filter(f => f.endsWith(".js"))
    for(const file of commandFiles){
        const command = require(`${process.cwd()}/src/commands/${file}`)
        client.commands.set(command.name, command)
        console.log(`${command.name} - loaded!`)
    }
    console.log(`Loaded ${client.commands.size} commands!`)
    client.commands.get("ascii").test(client)
}