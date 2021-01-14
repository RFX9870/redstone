module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor, lang){
        switch(args[0]){
            case "all":{
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
                return await message.addReaction("✅")
            }
            case "events":{
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
                return await message.addReaction("✅")
            }
            case "config":{
                try{
                    delete require.cache[require.resolve(`../JSON/config.json`)]
                    global.config = require("../JSON/config.json")
                    return await message.addReaction("✅")
                }catch(error){
                    return await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке настроек`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            }
            case "package":{
                try{
                    delete require.cache[require.resolve("../../package.json")]
                    global.package = require("../../package.json")
                    return await message.addReaction("✅")
                }catch(error){
                    return await message.channel.createEmbed({
                        title: `Ошибка при перезагрузке package.json`,
                        description: `\`\`\`js\n${error}\`\`\``,
                        color: embColor
                    })
                }
            }
            case "langs":{
                const fs = require("fs")
                client.langs.clear()
                const langFiles = fs.readdirSync("./src/langs").filter(f=>f.endsWith(".js")).map(f=>f.replace(".js", ""))
                for(const lang of langFiles){
                    try{
                        delete require.cache[require.resolve(`../langs/${lang}`)]
                        const lng = require(`../langs/${lang}`)
                        client.langs.set(lng.name, lng)
                    }catch(error){
                        return await message.channel.createEmbed({
                            title: `Ошибка при перезагрузке ${lang.name}`,
                            description: `\`\`\`js\n${error}\`\`\``,
                            color: embColor
                        })
                    }
                }
                return await message.addReaction("✅")
            }
            default:{
                if(!client.commands.has(args[0])) return await message.addReaction("❌")
                try{
                    delete require.cache[require.resolve(`./${args[0]}`)]
                    const command = require(`./${args[0]}`)
                    client.commands.set(command.name, command)
                    return await message.addReaction("✅")
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