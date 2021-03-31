module.exports = {
    name: "decode",
    usage: "decode_usage",
    description: "decode_desc",
    needArgs: true,
    group: "fun",
    async execute(client, message, args, prefix, embColor, lang){
        try{
            const result = []
            args.forEach(word => {
                (/[A-Za-z0-9]/).test(word) ? result.push(convert(word.replace(/[.]/g, ""), 16).toString(36)) : result.push(word)
            })
            const decoded = result.join(" ")
            return await message.channel.createEmbed({
                title: lang.decode,
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                description: decoded,
                color: embColor
            })
        }catch{
            return await message.channel.createMessage(lang.decode_error)
        }
    }
}