module.exports = {
    name: "say",
    usage: "<текст>",
    description: "отправляет сообщение от имени бота.",
    group: "other",
    async execute(client, message, args, prefix, embColor){
        const say = args.join(" ")
        if(!say && !message.attachments.length) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        const embed = {
            description: say || "",
            image: {url: message.attachments.map(a => a.url)[0]},
            footer: {text: message.author.tag, icon_url: message.author.avatarURL},
            timestamp: new Date().toISOString(),
            color: embColor
        }
        await message.delete().catch(() => void 0)
        return await message.channel.createMessage({embed})
    }
}