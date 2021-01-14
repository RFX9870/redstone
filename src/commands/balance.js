module.exports = {
    name: "balance",
    usage: "balance_usage",
    description: "balance_desc",
    group: "balance",
    aliases: ["bal"],
    async execute(client, message, args, prefix, embColor, lang){
        let user = message.mentions[0] || client.users.get(args[0]) || client.users.find(u => u.username == args.join(" ")) || client.users.find(u => u.tag == args.join(" ")) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!args[0]) user = message.author
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        let bal = await balance.findOne({where: {userID: user.id}})
        if(!bal) {
            await balance.create({userID: user.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: user.id}})
        }
        const embed = {
            author: {
                name: `${user.username}#${user.discriminator}`,
                icon_url: user.avatarURL
            },
            fields: [
                {
                    name: lang.balance,
                    value: `${Number(bal.value)} <:rscredit:767386949400657932>`,
                    inline: true
                },
                {
                    name: lang.deposit,
                    value: `${Number(bal.deposit)} <:rscredit:767386949400657932>`,
                    inline: true
                }
            ],
            color: embColor
        }
        return await message.channel.createMessage({embed})
    }
}