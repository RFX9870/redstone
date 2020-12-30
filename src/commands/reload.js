module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        switch(args[0]){
            case "all":{
                const msg = await message.channel.createMessage(`Перезагрузка команд...`)
                const fs = require("fs")
                client.commands.clear()
                const commandFiles = fs.readdirSync("./src/commands").filter(f=>f.endsWith(".js")).map(f=>f.replace(".js", ""))
                for(const cmd of commandFiles){
                    try{
                        delete require.cache[require.resolve(`./${cmd}`)]
                        const command = require(`./${cmd}`)
                        client.commands.set(command.name, command)
                    }catch(error){
                        return await message.channel.createEmbed({
                            title: `Ошибка при перезагрузке ${cmd.name}`,
                            description: `\`\`\`js\n${error}\`\`\``,
                            color: embColor
                        })
                    }
                }
                return await msg.edit(`Команды перезагружены!`)
            }
            case "events":{
                const msg = await message.channel.createMessage(`Перезагрузка эвентов...`)
                const fs = require("fs")
                const listenerFiles = fs.readdirSync("./src/events").filter(f=>f.endsWith(".js")).map(f=>f.replace(".js", ""))
                for(const file of listenerFiles){
                    try{
                        delete require.cache[require.resolve(`../events/${file}`)]
                        if(require(`../events/${file}`).reloadable){
                            client.removeAllListeners(file)
                            client.on(file, require(`../events/${file}`))
                        }
                    }catch(error){
                        return await message.channel.createEmbed({
                            title: `Ошибка при перезагрузке ${file}`,
                            description: `\`\`\`js\n${error}\`\`\``,
                            color: embColor
                        })
                    }
                }
                return await msg.edit(`Эвенты перезагружены!`)
            }
            case "config":{
                try{
                    delete require.cache[require.resolve(`../JSON/config.json`)]
                    global.config = require("../JSON/config.json")
                    return await message.channel.createMessage("Настройки перезагружены!")
                }catch(error){
                    return await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке настроек`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            }
            default:{
                if(!client.commands.has(args[0])) return await message.channel.createMessage("Такой команды нет")
                try{
                    delete require.cache[require.resolve(`./${args[0]}`)]
                    const command = require(`./${args[0]}`)
                    client.commands.set(command.name, command)
                    return await message.channel.createMessage(`Команда \`${command.name}\` перезагружена!`)
                }catch(error){
                    return await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке ${args[0]}`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            }
        }
    }
}