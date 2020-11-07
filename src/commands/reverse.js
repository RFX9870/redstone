module.exports = {
    name: "reverse",
    usage: "<текст>",
    description: "реверсирует текст.",
    group: "other",
    aliases: ["rev"],
    async execute(client, message, args, prefix, embColor){
        const text = args.join(" ")
        if(!text.length) return await message.channel.createMessage(`> :x: **Используйте \`${prefix}${this.name} ${this.usage}\`**`)
        const embed = {
            title: "Реверс",
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: text.split("").reverse().join(""),
            color: embColor
        }
        return await message.channel.createEmbed(embed)
    }
}