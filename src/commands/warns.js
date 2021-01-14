module.exports = {
    name: "warns",
    usage: "warns_usage",
    description: "warns_desc",
    group: "mod",
    async execute(client, message, args, prefix, embColor, lang){
        let user = message.mentions[0] || client.users.get(args[0]) || client.users.find(u => u.username == args.join(" ")) || client.users.find(u => u.tag == args.join(" ")) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        if(!args[0]) user = message.author
        const embed = {
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            title: `${lang.warns} ${user.tag}`,
            fields: [],
            color: embColor
        }
        const existedWarns = await warns.findAll({where: {userID: user.id, serverID: message.guild.id}})
        for(const warn of existedWarns){
            embed.fields.push({
                name: `ID: ${warn.id}, ${lang.warns_mod}: ${client.users.has(warn.modID) ? client.users.get(warn.modID).tag : warn.modID}`,
                value: lang.reason(warn.reason)
            })
        }
        embed.footer = {text: `${lang.all}: ${existedWarns.length}`}
        return await message.channel.createEmbed(embed)
    }
}