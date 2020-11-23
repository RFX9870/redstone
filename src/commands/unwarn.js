module.exports = {
    name: "unwarn",
    usage: "<ID предупреждения>",
    description: "убрать предупреждение с участника.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permissions.json.kickMembers || !message.member.permissions.json.banMembers) return await message.channel.createMessage("> :x: Для использования этой команды надо иметь права на кик или бан участников.")
        const warnToRemove = await warns.findOne({where: {id: args[0], serverID: message.guild.id}})
        if(!warnToRemove) return await message.channel.createMessage(`> :x: Предупреждение не найдено.`)
        await warnToRemove.destroy()
        return await message.channel.createEmbed({
            title: message.author.tag,
            fields: [
                {
                    name: `Снято предупреждение с ${client.users.has(warnToRemove.userID) ? client.users.get(warnToRemove.userID).tag : warnToRemove.userID}`,
                    value: `Причина предупреждения: ${warnToRemove.reason}`
                }
            ],
            color: embColor
        })
    }
}