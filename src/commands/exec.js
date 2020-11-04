module.exports = {
    name: "exec",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        const cmd = args.join(" ")
        try{
            const executed = require("child_process").execSync(cmd).toString()
            await message.channel.createMessage(`\`\`\`sh\n${executed}\`\`\``)
        }catch(err){
            await message.channel.createMessage(`\`\`\`sh\n${err}\`\`\``)
        }
    }
}