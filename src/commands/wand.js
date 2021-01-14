module.exports = {
    name: "wand",
    group: "dev",
    async execute(client, message, args, prefix, embColor, lang){
        return await message.channel.createMessage("<:wand:719182151039320257>")
    }
}