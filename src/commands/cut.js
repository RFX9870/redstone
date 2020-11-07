module.exports = {
    name: "cut",
    group: "dev",
    async execute(client, message, args, prefix, embColor){
        if(!message.author.pos1 || !message.author.pos2) return await message.channel.createMessage("а где позиции епта")
        return await message.channel.createMessage("да ты че... бляяяяяяяяяяяяяяяяяяяяяять!!!!")
        message.author.pos1 = false
        message.author.pos2 = false
    }
}