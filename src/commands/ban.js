function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "ban",
    usage: "ban_usage",
    description: "ban_desc",
    needArgs: true,
    permissions: {bot: "banMembers", user: "banMembers"},
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        let user = message.mentions[0] || client.users.get(args[0]) || args[0].replace(/[<@!>]/g, "")
        if(user.id == message.author.id) return await message.channel.createMessage(lang.ban_yourself)
        if(user.id == client.user.id) return await message.channel.createMessage(lang.ban_bot)
        const days = isNumber(parseInt(args[1])) && parseInt(args[1]) <= 7 && parseInt(args[1]) >= 0 ? args[1] : undefined
        const reason = days ? args.slice(2).join(" ") || lang.no_reason : args.slice(1).join(" ") || lang.no_reason
        if(reason.length > 450) return await message.channel.createMessage(lang.long_reason)
        if(message.channel.guild.members.has(user.id || user) && !message.member.highestRole.higherThan(message.channel.guild.members.get(user.id).highestRole) && message.channel.guild.ownerID != message.author.id) return await message.channel.createMessage(lang.ban_higher)
        message.channel.guild.banMember(user.id || user, days, encodeURI(`${message.author.username} | ${reason}`)).then(async () => {
            if(!client.users.get(user.id)) user = await client.getRESTUser(user)
            const embed = {
                title: message.author.tag,
                fields: [
                    {
                        name: lang.banned(user.tag),
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
                return await message.channel.createMessage(lang.ban_failed)
            }else if(err.message.endsWith("is not snowflake.") || err.message.startsWith("404")){
                return await message.channel.createMessage(lang.user_not_found)
            }
        })
    }
}