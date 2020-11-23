module.exports = {
    name: "warn",
    usage: "<@user#0000 или ID> [причина]",
    description: "вынести учестнику предупреждение.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permissions.json.kickMembers || !message.member.permissions.json.banMembers) return await message.channel.createMessage("> :x: Для использования этой команды надо иметь права на кик или бан участников.")
        const user = message.mentions[0] || message.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage("> :x: Участник не найден.")
        if(user.id == message.author.id) return await message.channel.createMessage("> :x: Нельзя выдать предупреждение самому себе.")
        if(user.id == client.user.id) return await message.channel.createMessage("> :x: Бот не может выдать себе предупреждение.")
        const reason = args.slice(1).join(" ") || "не указана"
        if(reason.length > 450) return await message.channel.createMessage("> :x: Указана слишком длинная причина.")
        const existedWarns = await warns.findAll({where: {userID: user.id, serverID: message.guild.id}})
        if(existedWarns.length > 25) return await message.channel.createMessage("> :x: Нельзя выдать больше 25 варнов одному учестнику.")
        const warn = await warns.create({userID: user.id, serverID: message.guild.id, modID: message.author.id, reason})
        return await message.channel.createEmbed({
            title: message.author.tag,
            fields: [
                {
                    name: `Участнику ${user.tag} вынесено предупреждение (ID ${warn.id})`,
                    value: `Причина: ${reason}`
                }
            ],
            color: embColor
        })
    }
}