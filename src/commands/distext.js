function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "distext",
    usage: "<число> <текст>",
    description: "Искажает текст.",
    group: "other",
    aliases: ["dt"],
    async execute(client, message, args, prefix, embColor){
        const text = args.slice(1).join(" ")
        const val = parseInt(args[0], 10)
        if(!text.length || !isNumber(val) || val == 0) return await message.channel.createMessage(`> :x: **Используйте \`${prefix}${this.name} ${this.usage}\`**`)
        const embed = {
            title: "Искажение текста",
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: text.dist(val),
            color: embColor
        }
        return await message.channel.createEmbed(embed)
    }
}