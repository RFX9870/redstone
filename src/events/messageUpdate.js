module.exports = async function(message, oldMessage){
    if(!message || !oldMessage) return
    if(message.content == oldMessage.content) return
    const use = message.author.cmdUses.get(message.timestamp)
    try{
        if(use) await use.delete()
    }finally{
        message._client.emit("messageCreate", message)
    }
}