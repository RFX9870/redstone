module.exports = {
    name: "ascii",
    usage: "<текст>",
    description: "создает ASCII арт из текста.",
    group: "fun",
    async execute(client, message, args, prefix, embColor){
        const text = args.join(" ").replace(/'/g, '"')
        if(!text) return await message.channel.createMessage(`> :x: **Используйте \`\`${prefix}${this.name} ${this.usage}\`\`**`)
        let converted = require("child_process").execSync(`toilet -f mono12 '${text}'`).toString()
        if(!converted.length) return await message.channel.createMessage("> :x: **Не удалось конвертировать эту строку.**")
        if(converted.length > 1999) {
            await message.channel.createMessage("", {name: "ascii.txt", file: Buffer.from(converted)})
        }else{
            await message.channel.createMessage(`\`\`\`\n${converted}\`\`\``)
        }
    }
}