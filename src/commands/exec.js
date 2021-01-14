module.exports = {
    name: "exec",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor, lang){
        const cmd = args.join(" ")
        try{
            const executed = require("child_process").execSync(cmd).toString()
            return await message.channel.createMessage(`\`\`\`sh\n${executed}\`\`\``)
        }catch(err){
            return await message.channel.createMessage(`\`\`\`sh\n${err}\`\`\``)
        }
    }
}