function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "random",
    usage: "[от] <до>",
    description: "даёт случайное число.",
    group: "other",
    aliases: ["rand"],
    async execute(client, message, args, prefix, embColor){
        let result = getRandomInt(parseInt(args[0], 10), parseInt(args[1], 10))
        if(!args[1]) result = getRandomInt(0, parseInt(args[0], 10))
        if(!isNumber(result)) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\`.`)
        const embed = {
            fields: [
                {
                    name: `Случайное число от ${!!args[1] ? parseInt(args[0], 10) : 0} до ${parseInt(args[1], 10) || parseInt(args[0], 10)}`,
                    value: result
                },
            ],
            color: getRandomInt(0, 0xFFFFFF)
        }
        await message.channel.createMessage({embed})
    }
}