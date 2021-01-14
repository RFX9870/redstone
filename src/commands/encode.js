function convert(value, radix) {
    return [...value.toString()]
        .reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), 0n);
}

module.exports = {
    name: "encode",
    usage: "encode_usage",
    description: "encode_desc",
    needArgs: true,
    group: "fun",
    async execute(client, message, args, prefix, embColor, lang){
        const result = []
        args.forEach(word => {
            try{
                (/[A-Za-z0-9]/).test(word) ? result.push(convert(word.replace(/[.]/g, ""), 36).toString(16)) : result.push(word)
            }catch{
                result.push(word)
            }
        })
        const encoded = result.join(" ")
        return await message.channel.createEmbed({
            title: lang.encode,
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: encoded,
            footer: {text: lang.encode_tip},
            color: embColor
        })
    }
}