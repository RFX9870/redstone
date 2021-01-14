module.exports = {
    name: "ascii",
    usage: "ascii_usage",
    description: "ascii_desc",
    needArgs: true,
    group: "fun",
    async execute(client, message, args, prefix, embColor, lang){
        const text = args.join(" ").replace(/'/g, '"')
        let converted = require("child_process").execSync(`toilet -f mono12 '${text}'`).toString()
        if(!converted.length) return await message.channel.createMessage(lang.ascii_fail)
        if(converted.length > 1999) {
            return await message.channel.createMessage("", {name: "ascii.txt", file: Buffer.from(converted)})
        }else{
            return await message.channel.createMessage(`\`\`\`\n${converted}\`\`\``)
        }
    }
}