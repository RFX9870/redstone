function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "softban",
    usage: "<@user#0000 или ID> <дни для очистки (от 1 до 7)> [причина]",
    description: "кикает участника и удаляет сообщения.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permission.json.kickMembers || !message.member.permission.json.banMembers || !message.channel.guild.me.permission.json.banMembers) return await message.channel.createMessage("> :x: У бота или у вас недостаточно прав на бан/кик.")
        let user = message.mentions[0] || message.channel.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage("> :x: Участник не найден.")
        if(user.id == message.author.id) return await message.channel.createMessage("> :x: Нельзя софтбанить самого себя.")
        if(user.id == client.user.id) return await message.channel.createMessage("> :x: Бот не может софтбанить самого себя.")
        const days = isNumber(parseInt(args[1])) && parseInt(args[1]) <= 7 && parseInt(args[1]) > 0 ? args[1] : undefined
        if(!days) return await message.channel.createMessage("> :x: Укажите корректное кол-во дней для очистки сообщений. (от 1 до 7)")
        const reason = args.slice(2).join(" ") || "Причина не указана"
        if(reason.length > 450) return await message.channel.createMessage("> :x: Указана слишком длинная причина.")
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage("> :x: Нельзя софтбанить участника который выше вас.")
        message.channel.guild.banMember(user.id, days, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            return await message.channel.guild.unbanMember(user.id, encodeURI(`${message.author.username} | ${reason} (softban)`))
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: `${user.tag} был софтбанен!`,
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
                return await message.channel.createMessage("> :x: Не удалось софтбанить этого участника.")
            }else if(err.message.endsWith("is not snowflake.")){
                return await message.channel.createMessage("> :x: Указан неверный ID.")
            }
        })
    }
}