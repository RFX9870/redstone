module.exports = {
    name: "support",
    usage: "<картинка и/или текст>",
    description: "задать вопрос в поддержку",
    group: "other",
    aliases: ["report"],
    async execute(client, message, args, prefix, embColor){
        const reason = args.join(" ")
        if(!reason.length && !message.attachments.length) return await message.channel.createMessage(`> :x: **Используйте \`${prefix}${this.name} ${this.usage}\`**`)
        const ticket = await support.create({userID: message.author.id, channelID: message.channel.id, reason, resolved: false})
        await client.createMessage(config.support, {embed: {
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            title: "Вопрос",
            description: reason,
            footer: {text: `ID: ${ticket.id}`},
            image: {url: message.attachments.map(a=>a.url)[0]},
            color: config.embColor
        }})
        await message.channel.createMessage("> :white_check_mark: **Ваше сообщение отправлено!**")
    }
}