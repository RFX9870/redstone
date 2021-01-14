module.exports = {
    name: "reverse",
    usage: "reverse_usage",
    description: "reverse_desc",
    needArgs: true,
    group: "other",
    aliases: ["rev"],
    async execute(client, message, args, prefix, embColor, lang){
        const text = args.join(" ")
        const embed = {
            title: lang.reverse,
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: text.split("").reverse().join(""),
            color: embColor
        }
        return await message.channel.createEmbed(embed)
    }
}