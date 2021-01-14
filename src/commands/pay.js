function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "pay",
    usage: "pay_usage",
    description: "pay_desc",
    group: "balance",
    async execute(client, message, args, prefix, embColor, lang){
        if(!args[0] || !args[1]) return await message.channel.createMessage(lang.cmd_usage(prefix, this))
        let user = message.mentions[0] || message.guild.members.get(args[0]) 
        if(!user) return await message.channel.createMessage(lang.user_not_found)
        if(user.bot) return await message.channel.createMessage(lang.pay_bot)
        if(user.id == message.author.id) return await message.channel.createMessage(lang.pay_yourself)
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
        if(!isNumber(amount) || amount <= 0) return await message.channel.createMessage(lang.invalid_amount)
        if(amount > Number(bal.value)) return await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: lang.transfer,
                    value: lang.no_bal(bal.value)
                }
            ],
            color: embColor
        })
        await balReciever.update({value: Number(balReciever.value) + amount})
        await bal.update({value: Number(bal.value) - amount})
        return await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: lang.transfer,
                    value: lang.pay_success(amount, user.tag)
                }
            ],
            color: embColor
        })
    }
}