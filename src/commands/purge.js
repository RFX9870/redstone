function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "purge",
    usage: "<кол-во>",
    description: "очищает сообщения.",
    group: "mod",
    aliases: ["clear", "prune"],
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!message.member.permission.json.manageMessages|| !message.channel.guild.me.permission.json.manageMessages) return await message.channel.createMessage("> :x: У бота или у вас недостаточно прав на удаление сообщений.")
        if(!isNumber(args[0]) || parseInt(args[0]) > 100 || parseInt(args[0]) <= 0) return await message.channel.createMessage("> :x: Укажите корректное кол-во сообщений для очистки. (от 1 до 100)")
        const deleted = await message.channel.purge(parseInt(args[0])+1)
        const msg = await message.channel.createMessage(`> :white_check_mark: **Удалено \`\`${deleted-1 == parseInt(args[0]) ? parseInt(args[0]) : deleted}\`\` сообщений. Это сообщение удалится через 5 секунд.** `)
        setTimeout(async() => await msg.delete(), 5000)
    }
}