function convert(value, radix) {
    return [...value.toString()]
        .reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), 0n);
}

module.exports = {
    name: "decode",
    usage: "<hex>",
    description: "переводит hex в английский текст.",
    group: "fun",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        try{
            const result = []
            args.forEach(word => {
                (/[A-Za-z0-9]/).test(word) ? result.push(convert(word.replace(/[.]/g, ""), 16).toString(36)) : result.push(word)
            })
            const decoded = result.join(" ")
            return await message.channel.createEmbed({
                title: "Декодирование",
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                description: decoded,
                color: embColor
            })
        }catch{
            return await message.channel.createMessage(`> :x: **Можно декодировать только hex**`)
        }
    }
}