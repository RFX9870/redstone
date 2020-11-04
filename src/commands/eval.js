module.exports = {
    name: "eval",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        const code = args.join(" ")
        const acode = `(async () => {${code}})()`
        try{
            let evaled = await eval(acode)
            if(typeof evaled != "string") evaled = require("util").inspect(evaled)
            await message.channel.createMessage(`\`\`\`js\n${evaled}\`\`\``)
        }catch(err){
            await message.channel.createMessage(`\`\`\`js\n${err}\`\`\``)
        }
    }
}