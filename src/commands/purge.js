module.exports = {
    name: "purge",
    usage: "purge_usage",
    description: "purge_desc",
    needArgs: true,
    permissions: {bot: "manageMessages", user: "manageMessages"},
    group: "mod",
    aliases: ["clear", "prune"],
    async execute(client, message, args, prefix, embColor, lang){
        if(!isNumber(args[0]) || parseInt(args[0]) > 100 || parseInt(args[0]) <= 0) return await message.channel.createMessage(lang.purge_invalid_amount)
        const deleted = await message.channel.purge(parseInt(args[0])+1)
        const msg = await message.channel.createMessage(lang.purge_success(deleted, args[0]))
        setTimeout(async() => await msg.delete(), 5000)
    }
}