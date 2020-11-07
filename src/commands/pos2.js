module.exports = {
    name: "pos2",
    group: "dev",
    async execute(client, message, args, prefix, embColor){
        if(!message.author.pos1) return await message.channel.createMessage("а где первая епта")
        message.author.pos2 = true
        return await message.addReaction("✅")
    }
}