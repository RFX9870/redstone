module.exports = {
    name: "dice",
    usage: "dice_usage",
    description: "dice_desc",
    needArgs: true,
    group: "balance",
    aliases: ["casino"],
    async execute(client, message, args, prefix, embColor, lang){
        const win = Math.random()
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        const amount = parseInt(args[0])
        if(!isNumber(amount) || amount <= 0) return await message.channel.createMessage(lang.dice_invalid_bet)
        if(amount > Number(bal.value)) return await message.channel.createMessage(lang.no_bal(bal.value))
        if(win > 0.5){
            await bal.update({value: Number(bal.value) + amount})
            return await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: lang.casino,
                        value: lang.dice_win(amount, bal.value)
                    }
                ],
                color: embColor
            })
        }else if(win.toString().startsWith("0.01")){
            await bal.update({value: Number(bal.value) + amount*4})
            return await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: lang.casino,
                        value: lang.dice_win_x4(amount, bal.value)
                    }
                ],
                color: embColor,
            })
        }
        else if(!win < 0.5){
            await bal.update({value: Number(bal.value) - amount})
            return await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: lang.casino,
                        value: lang.dice_lose(amount, bal.value)
                    }
                ],
                color: embColor
            })
        }
    }
}