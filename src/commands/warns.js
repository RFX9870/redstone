module.exports = {
    name: "warns",
    usage: "[@user#0000 или ID]",
    description: "просмотреть предупреждения.",
    group: "mod",
    async execute(client, message, args, prefix, embColor){
        let user = message.mentions[0] || client.users.get(args[0]) || client.users.find(u => u.username == args.join(" ")) || client.users.find(u => u.tag == args.join(" ")) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!user) return await message.channel.createMessage("> :x: Участник не найден.")
        if(!args[0]) user = message.author
        const embed = {
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            title: `Предупреждения ${user.tag}`,
            fields: [],
            color: embColor
        }
        const existedWarns = await warns.findAll({where: {userID: user.id, serverID: message.guild.id}})
        for(const warn of existedWarns){
            embed.fields.push({
                name: `ID: ${warn.id}, модератор: ${client.users.has(warn.modID) ? client.users.get(warn.modID).tag : warn.modID}`,
                value: `Причина: ${warn.reason}`
            })
        }
        embed.footer = {text: `Всего: ${existedWarns.length}`}
        return await message.channel.createEmbed(embed)
    }
}