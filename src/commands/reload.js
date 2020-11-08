module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        if(args[0] == "all"){
            const m = await message.channel.createMessage(`Перезагрузка команд...`)
            client.commands.map(c=>c).forEach(async(cmd, index) => {
                try{
                    delete require.cache[require.resolve(`./${cmd.name}`)]
                    client.commands.set(cmd.name, require(`./${cmd.name}`))
                    await m.edit({content: `\`${cmd.name}\` - перезагружена (${index+1} из ${client.commands.size})`})
                }catch(error){
                    return await message.channel.createMessage(`\`${cmd.name}\` - ошибка \`\`${error.toString()}\`\` (${index+1} из ${client.commands.size})`)
                }
            })
        }else if(args[0] == "config"){
            try{
                delete require.cache[require.resolve(`../JSON/config.json`)]
                global.config = require("../JSON/config.json")
                return await message.channel.createMessage("Настройки перезагружены!")
            }catch(error){
                return await message.channel.createMessage(`Ошибка при перезагрузке настроек: \`\`${error.toString()}\`\``)
            }
        }else{
            if(!client.commands.has(args[0])) return await message.channel.createMessage("Такой команды нет")
            try{
                delete require.cache[require.resolve(`./${args[0]}`)]
                client.commands.set(args[0], require(`./${args[0]}`))
                return await message.channel.createMessage(`Команда \`${args[0]}\` перезагружена!`)
            }catch(error){
                return await message.channel.createMessage(`Ошибка при перезагрузке \`${args[0]}\`: \`\`${error.toString()}\`\``)
            }
        }
    }
}