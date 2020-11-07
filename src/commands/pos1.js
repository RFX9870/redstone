module.exports = {
    name: "pos1",
    group: "dev",
    async execute(client, message, args, prefix, embColor){
        message.author.pos1 = true
        message.author.pos2 = false
        return await message.addReaction("✅")
    }
}