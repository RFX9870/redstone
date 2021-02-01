module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor, lang){
        switch(args[0]){
            case "all":{
                for(const cmd of client.commands.values()) delete require.cache[require.resolve(`./${cmd.name}`)]
                client.commands.clear()
                init.commands()
                return await message.addReaction("✅")
            }
            case "events":{
                const fs = require("fs")
                for(const clientlr of client.eventNames()) delete require.cache[require.resolve(`../events/client/${clientlr}`)]
                for(const processlr of process.eventNames().filter(l => fs.readdirSync("./src/events/process").includes(l))) delete require.cache[require.resolve(`../events/process/${processlr}`)]
                client.removeAllListeners()
                process.removeAllListeners()
                init.events_client()
                init.events_process()
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
                for(const lang of client.langs.values()) delete require.cache[require.resolve(`../langs/${lang.name}`)]
                client.langs.clear()
                init.langs()
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
