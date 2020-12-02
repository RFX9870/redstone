module.exports = async function(message, oldMessage){
    if(!message || !oldMessage) return
    if(message.content == oldMessage.content) return
    if(config.antibot && message.author.bot) return
    if(!message.channel.guild) return
    const {_client: client} = message
    const prefix = await prefixes.findOne({where: {serverID: message.guild.id}})
    const usedPrefix = prefix ? prefix.value.toLowerCase() : config.prefix.toLowerCase()
    const cmdName = message.content.slice(usedPrefix.length).toLowerCase().split(" ")[0]
    const command = client.commands.get(cmdName) || client.commands.find(c => c.aliases && c.aliases.includes(cmdName))
    if(!command) return
    const use = message.author.cmdUses.get(message.timestamp)
    try{
        if(use) await use.delete()
    }finally{
        message._client.emit("messageCreate", message)
    }
}

module.exports.reloadable = true