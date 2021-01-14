module.exports = {
    name: "kick",
    usage: "kick_usage",
    description: "kick_desc",
    needArgs: true,
    permissions: {bot: "kickMembers", user: "kickMembers"},
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        let user = message.mentions[0] || message.channel.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        if(user.id == message.author.id) return await message.channel.createMessage(lang.kick_yourself)
        if(user.id == client.user.id) return await message.channel.createMessage(lang.kick_bot)
        const reason = args.slice(1).join(" ") || lang.no_reason
        if(reason.length > 450) return await message.channel.createMessage(lang.long_reason)
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage(lang.kick_higher)
        message.channel.guild.kickMember(user.id, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: lang.kicked(user.tag),
                        value: lang.reason(reason)
                    }
                ],
                color: embColor
            }
            return await message.channel.createMessage({embed})
        }).catch(async err => {
            if(err.message == "Unknown User"){
                return await message.channel.createMessage(lang.user_not_found)
            }else if(err.message == "Missing Permissions"){
                return await message.channel.createMessage(lang.kick_failed)
            }else if(err.message.endsWith("is not snowflake.") || err.message.startsWith("404")){
                return await message.channel.createMessage(lang.user_not_found)
            }
        })
    }
}