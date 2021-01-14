module.exports = {
    name: "eval",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor, lang){
        const code = args.join(" ")
        const acode = `(async () => {${code}})()`
        try{
            let evaled = await eval(acode)
            if(typeof evaled != "string") evaled = require("util").inspect(evaled)
            return await message.channel.createMessage(`\`\`\`js\n${evaled}\`\`\``)
        }catch(err){
            return await message.channel.createMessage(`\`\`\`js\n${err}\`\`\``)
        }
    }
}