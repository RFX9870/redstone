function convert(value, radix) {
    return [...value.toString()]
        .reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), 0n);
}

module.exports = {
    name: "encode",
    usage: "<текст>",
    description: "переводит английский текст в hex.",
    group: "fun",
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
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
            title: "Кодирование",
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: encoded,
            footer: {text: "Кодируются только английские буквы и цифры"},
            color: embColor
        })
    }
}