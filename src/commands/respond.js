module.exports = {
    name: "respond",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        const msg = args.slice(1).join(" ")
        if(!msg.length) return await message.channel.createMessage("> :x: Нет сообщения")
        const ticket = await support.findOne({where: {id: args[0]}})
        if(!ticket || ticket.resolved) return await message.channel.createMessage("> :x: Такого тикета нет или он уже решен")
        await client.createMessage(ticket.channelID, {content: `<@${ticket.userID}>`, embed: {
            title: "На ваш вопрос пришел ответ",
            description: msg,
            fields: [{
                name: "Ваш вопрос",
                value: ticket.reason.substring(0, 999) || "Картинка"
            }],
            color: config.embColor
        }})
        await ticket.update({resolved: true})
        await message.channel.createMessage("> :white_check_mark: Ответ отправлен")
    }
}