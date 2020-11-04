function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "pay",
    usage: "<ID/@упоминание> <количество>",
    description: "переводит <:rscredit:767386949400657932> другому пользователю.",
    group: "balance",
    async execute(client, message, args, prefix, embColor){
        if(!args[0] || !args[1]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        let user = message.mentions[0] || message.guild.members.get(args[0]) 
        if(!user) return await message.channel.createMessage("> :x: **Пользователь не найден.**")
        if(user.bot) return await message.channel.createMessage("> :x: **Нельзя переводить валюту ботам.**")
        if(user.id == message.author.id) return await message.channel.createMessage("> :x: **Нельзя переводить валюту себе.**")
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        let balReciever = await balance.findOne({where: {userID: user.id}})
        if(!balReciever) {
            await balance.create({userID: user.id, value: 0, deposit: 0})
            balReciever = await balance.findOne({where: {userID: user.id}})
        }
        const amount = parseInt(args[1])
        if(!isNumber(amount) || amount <= 0) return await message.channel.createMessage("> :x: **Введено неверное количество.**")
        if(amount > Number(bal.value)) return await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: "Перевод",
                    value: `:x: **У вас нет столько валюты. Ваш баланс: ${Number(bal.value)} <:rscredit:767386949400657932>**`
                }
            ],
            color: embColor
        })
        await balReciever.update({value: Number(balReciever.value) + amount})
        await bal.update({value: Number(bal.value) - amount})
        await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: "Перевод",
                    value: ` :white_check_mark: **Переведено ${amount} <:rscredit:767386949400657932> пользователю ${user.username}#${user.discriminator}**`
                }
            ],
            color: embColor
        })
    }
}