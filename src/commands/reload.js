module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        switch(args[0]){
            case "all":
                const ma = await message.channel.createMessage(`Перезагрузка команд...`)
                for(const cmd of client.commands.values()){
                    try{
                        delete require.cache[require.resolve(`./${cmd.name}`)]
                    }catch(error){
                        await message.channel.createEmbed({
                            title: `Ошибка при перезагрузке ${cmd.name}`,
                            description: `\`\`\`js\n${error}\`\`\``,
                            color: embColor
                        })
                    }
                }
                await ma.edit(`Команды перезагружены!`)
            break
            case "events":
                const me = await message.channel.createMessage(`Перезагрузка эвентов...`)
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
                        await message.channel.createEmbed({
                            title: `Ошибка при перезагрузке ${file}`,
                            description: `\`\`\`js\n${error}\`\`\``,
                            color: embColor
                        })
                    }
                }
                await me.edit(`Эвенты перезагружены!`)
            break
            case "config":
                try{
                    delete require.cache[require.resolve(`../JSON/config.json`)]
                    global.config = require("../JSON/config.json")
                    await message.channel.createMessage("Настройки перезагружены!")
                }catch(error){
                    await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке настроек`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            break
            default:
                if(!client.commands.has(args[0])) return await message.channel.createMessage("Такой команды нет")
                try{
                    delete require.cache[require.resolve(`./${args[0]}`)]
                    client.commands.set(args[0], require(`./${args[0]}`))
                    await message.channel.createMessage(`Команда \`${args[0]}\` перезагружена!`)
                }catch(error){
                    await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке ${args[0]}`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            break
        }
    }
}