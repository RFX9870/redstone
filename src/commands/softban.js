function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "softban",
    usage: "softban_usage",
    description: "softban_desc",
    needArgs: true,
    permissions: {bot: "banMembers", user: "banMembers"},
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        let user = message.mentions[0] || message.channel.guild.members.get(args[0])
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        if(user.id == message.author.id) return await message.channel.createMessage(lang.softban_yourself)
        if(user.id == client.user.id) return await message.channel.createMessage(lang.softban_bot)
        const days = isNumber(parseInt(args[1])) && parseInt(args[1]) <= 7 && parseInt(args[1]) > 0 ? args[1] : undefined
        if(!days) return await message.channel.createMessage(lang.softban_error)
        const reason = args.slice(2).join(" ") || lang.no_reason
        if(reason.length > 450) return await message.channel.createMessage(lang.long_reason)
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage(lang.softban_higher)
        message.channel.guild.banMember(user.id, days, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            await message.channel.guild.unbanMember(user.id, encodeURI(`${message.author.username} | ${reason} (softban)`))
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: lang.softbanned(user.tag),
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
                return await message.channel.createMessage(lang.softban_failed)
            }else if(err.message.endsWith("is not snowflake.") || err.message.startsWith("404")){
                return await message.channel.createMessage(lang.user_not_found)
            }
        })
    }
}