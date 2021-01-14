module.exports = {
    name: "warn",
    usage: "warn_usage",
    description: "warn_desc",
    needArgs: true,
    permissions: {user: "kickMembers"},
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        const user = message.mentions[0] || message.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        if(user.id == message.author.id) return await message.channel.createMessage(lang.warn_yourself)
        if(user.id == client.user.id) return await message.channel.createMessage(lang.warn_bot)
        const reason = args.slice(1).join(" ") || lang.no_reason
        if(reason.length > 450) return await message.channel.createMessage(lang.long_reason)
        const existedWarns = await warns.findAll({where: {userID: user.id, serverID: message.guild.id}})
        if(existedWarns.length > 25) return await message.channel.createMessage(lang.warn_error)
        const warn = await warns.create({userID: user.id, serverID: message.guild.id, modID: message.author.id, reason})
        return await message.channel.createEmbed({
            title: message.author.tag,
            fields: [
                {
                    name: lang.warned(warn.id, user.tag),
                    value: lang.reason(reason)
                }
            ],
            color: embColor
        })
    }
}