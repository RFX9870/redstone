module.exports = {
    name: "kick",
    usage: "<@user#0000 или ID> [причина]",
    description: "кикает участника.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permission.json.kickMembers || !message.member.permission.json.banMembers || !message.channel.guild.me.permission.json.kickMembers) return await message.channel.createMessage("> :x: У бота или у вас недостаточно прав на кик.")
        let user = message.mentions[0] || message.channel.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage("> :x: Участник не найден.")
        if(user.id == message.author.id) return await message.channel.createMessage("> :x: Нельзя кикнуть самого себя.")
        if(user.id == client.user.id) return await message.channel.createMessage("> :x: Бот не может кикнуть самого себя.")
        const reason = args.slice(1).join(" ") || "Причина не указана"
        if(reason.length > 450) return await message.channel.createMessage("> :x: Указана слишком длинная причина.")
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage("> :x: Нельзя кикнуть участника который выше вас.")
        message.channel.guild.kickMember(user.id, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: `${user.tag} был кикнут!`,
                        value: `Причина: ${reason}`
                    }
                ],
                color: embColor
            }
            await message.channel.createMessage({embed})
        }).catch(async err => {
            if(err.message == "Unknown User"){
                await message.channel.createMessage("> :x: Пользователь не найден.")
            }else if(err.message == "Missing Permissions"){
                await message.channel.createMessage("> :x: Не удалось кикнуть этого участника.")
            }else if(err.message.endsWith("is not snowflake.")){
                await message.channel.createMessage("> :x: Указан неверный ID.")
            }
        })
    }
}