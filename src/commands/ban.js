function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "ban",
    usage: "<@user#0000 или ID> [дни для очистки (от 1 до 7)] [причина]",
    description: "банит участника.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permissions.json.banMembers || !message.channel.guild.me.permissions.json.banMembers) return await message.channel.createMessage("> :x: У бота или у вас недостаточно прав на бан.")
        let user = message.mentions[0] || client.users.get(args[0]) || args[0].replace(/[<@!>]/g, "")
        if(user.id == message.author.id) return await message.channel.createMessage("> :x: Нельзя забанить самого себя.")
        if(user.id == client.user.id) return await message.channel.createMessage("> :x: Бот не может забанить самого себя.")
        const days = isNumber(parseInt(args[1])) && parseInt(args[1]) <= 7 && parseInt(args[1]) >= 0 ? args[1] : undefined
        const reason = days ? args.slice(2).join(" ") || "Причина не указана" : args.slice(1).join(" ") || "Причина не указана"
        if(reason.length > 450) return await message.channel.createMessage("> :x: Указана слишком длинная причина.")
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage("> :x: Нельзя забанить участника который выше вас.")
        message.channel.guild.banMember(user.id || user, days, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            if(!client.users.get(user.id)) user = await client.getRESTUser(user)
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: `${user.tag} был забанен!`,
                        value: `Причина: ${reason}`
                    }
                ],
                color: embColor
            }
            return await message.channel.createMessage({embed})
        }).catch(async err => {
            if(err.message == "Unknown User"){
                return await message.channel.createMessage("> :x: Пользователь не найден.")
            }else if(err.message == "Missing Permissions"){
                return await message.channel.createMessage("> :x: Не удалось забанить этого участника.")
            }else if(err.message.endsWith("is not snowflake.") || err.message.startsWith("404")){
                return await message.channel.createMessage("> :x: Пользователь не найден.")
            }
        })
    }
}