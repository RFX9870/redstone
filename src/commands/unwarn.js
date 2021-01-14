module.exports = {
    name: "unwarn",
    usage: "unwarn_usage",
    description: "unwarn_desc",
    needArgs: true,
    permissions: {user: "kickMembers"},
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        const warnToRemove = await warns.findOne({where: {id: args[0], serverID: message.guild.id}})
        if(!warnToRemove) return await message.channel.createMessage(lang.warn_not_found)
        await warnToRemove.destroy()
        return await message.channel.createEmbed({
            title: message.author.tag,
            fields: [
                {
                    name: lang.unwarned(client.users.has(warnToRemove.userID) ? client.users.get(warnToRemove.userID).tag : warnToRemove.userID),
                    value: lang.reason(warnToRemove.reason)
                }
            ],
            color: embColor
        })
    }
}