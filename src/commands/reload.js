module.exports = {
    name: "reload",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        if(args[0] == "all"){
            const m = await message.channel.createMessage(`ААААА`)
            client.commands.map(c=>c).forEach(async(cmd, index) => {
                try{
                    delete require.cache[require.resolve(`./${cmd.name}`)]
                    client.commands.set(cmd.name, require(`./${cmd.name}`))
                    await m.edit({content: `\`${cmd.name}\` - .O .K (${index+1}/${client.commands.size})`})
                }catch(error){
                    await message.channel.createMessage(`\`${cmd.name}\` - не .O .K \`\`${error.toString()}\`\` (${index+1}/${client.commands.size})`)
                }
            })
        }else if(args[0] == "config"){
            try{
                delete require.cache[require.resolve(`../JSON/config.json`)]
                global.config = require("../JSON/config.json")
                await message.channel.createMessage(".O .K")
            }catch(error){
                await message.channel.createMessage(`не .O .K (\`\`${error.toString()}\`\`)`)
            }
        }else{
            if(!client.commands.has(args[0])) return await message.channel.createMessage("не .O .K (такой команды нет)")
            try{
                delete require.cache[require.resolve(`./${args[0]}`)]
                client.commands.set(args[0], require(`./${args[0]}`))
                await message.channel.createMessage(".O .K")
            }catch(error){
                await message.channel.createMessage(`не .O .K (\`\`${error.toString()}\`\`)`)
            }
        }
    }
}