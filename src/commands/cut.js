module.exports = {
    name: "cut",
    group: "dev",
    async execute(client, message, args, prefix, embColor, lang){
        if(!message.author.pos1 || !message.author.pos2) return await message.channel.createMessage("а где позиции епта")
        message.author.pos1 = false
        message.author.pos2 = false
        return await message.channel.createMessage("да ты че... бляяяяяяяяяяяяяяяяяяяяяять!!!!")
    }
}