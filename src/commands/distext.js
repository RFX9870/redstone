module.exports = {
    name: "distext",
    usage: "distext_usage",
    description: "distext_desc",
    needArgs: true,
    group: "other",
    aliases: ["dt"],
    async execute(client, message, args, prefix, embColor, lang){
        const text = args.slice(1).join(" ")
        const val = parseInt(args[0], 10)
        if(!isNumber(val) || val == 0) return await message.channel.createMessage(lang.cmd_usage(prefix, this))
        const embed = {
            title: lang.distext,
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: text.dist(val),
            color: embColor
        }
        return await message.channel.createEmbed(embed)
    }
}