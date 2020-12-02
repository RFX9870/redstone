module.exports = async function(message){
    if(config.antibot && message.author.bot) return
    if(!message.channel.guild) return
    const {_client: client} = message
    const prefix = await prefixes.findOne({where: {serverID: message.guild.id}})
    const usedPrefix = prefix ? prefix.value.toLowerCase() : config.prefix.toLowerCase()
    const color = await embColors.findOne({where: {userID: message.author.id}})
    let usedColor = color ? color.value : config.embColor
    if(usedColor == -1) usedColor = Math.floor(Math.random() * 0xffffff)
    if(message.content.toLowerCase().startsWith(usedPrefix)){
        if(!message.channel.guild.me.permission.json.embedLinks) return await message.channel.createMessage("У бота отсутствует право `встраивать ссылки`")
        if(!message.channel.guild.me.permission.json.sendMessages) return
        const cmdName = message.content.slice(usedPrefix.length).toLowerCase().split(" ")[0]
        const command = client.commands.get(cmdName) || client.commands.find(c => c.aliases && c.aliases.includes(cmdName))
        if(!command) return
        if(command.ownerOnly && !config.owners.includes(message.author.id)) return
        const args = message.content.slice(usedPrefix.length + cmdName.length).trim().split(" ")
        try{
            var executed = await command.execute(client, message, args, usedPrefix, usedColor)
        }catch(error){
            const embed = {
                title: "Произошла ошибка при выполнении команды.",
                description: `\`\`\`js\n${error}\`\`\``,
                color: config.embColor
            }
            await message.channel.createMessage({embed})
            if(config.errlogger.enabled) await client.executeWebhook(config.errlogger.id, config.errlogger.token, {embeds: [{
                title: "Ошибка в команде",
                description: `\`\`\`js\n${error.stack}\`\`\``,
                fields: [{name: "Сообщение", value: message.content}],
                color: config.embColor
            }]})
        }finally{
            const embed = {
                title: `Использована команда ${command.name}`,
                description: message.content,
                fields: [
                    {
                        name: "Пользователь",
                        value: `${message.author.username}#${message.author.discriminator} (${message.author.id})`
                    },
                    {
                        name: "Сервер",
                        value: `${message.channel.guild.name} (${message.channel.guild.id})`
                    },
                    {
                        name: "Канал",
                        value: `${message.channel.name} (${message.channel.id})`
                    }
                ],
                color: config.embColor
            }
            if(config.logger.enabled) await client.executeWebhook(config.logger.id, config.logger.token, {embeds: [embed]})
            if(executed instanceof Eris.Message) message.author.cmdUses.set(message.timestamp, executed)
        }
    }
    if(message.content == client.user.mention || message.content == message.guild.me.mention) await client.commands.get("prefix").execute(client, message, [], usedPrefix, usedColor)
}