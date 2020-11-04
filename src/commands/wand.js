module.exports = {
    name: "wand",
    group: "dev",
    async execute(client, message, args, prefix, embColor){
        await message.channel.createMessage("<:wand:719182151039320257>")
    }
}