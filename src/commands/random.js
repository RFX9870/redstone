module.exports = {
    name: "random",
    usage: "random_usage",
    description: "random_desc",
    needArgs: true,
    group: "other",
    aliases: ["rand"],
    async execute(client, message, args, prefix, embColor, lang){
        let result = getRandomInt(parseInt(args[0], 10), parseInt(args[1], 10))
        if(!args[1]) result = getRandomInt(0, parseInt(args[0], 10))
        if(!isNumber(result)) return await message.channel.createMessage(lang.cmd_usage(prefix, this))
        const embed = {
            fields: [
                {
                    name: lang.random(args),
                    value: result
                },
            ],
            color: getRandomInt(0, 0xFFFFFF)
        }
        return await message.channel.createMessage({embed})
    }
}