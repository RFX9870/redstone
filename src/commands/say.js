module.exports = {
    name: "say",
    usage: "say_usage",
    description: "say_desc",
    group: "other",
    async execute(client, message, args, prefix, embColor, lang){
        const say = args.join(" ")
        if(!say && !message.attachments.length) return await message.channel.createMessage(lang.cmd_usage(prefix, this))
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