function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "dice",
    usage: "<ставка>",
    description: "позволяет делать ставки в <:rscredit:767386949400657932>.",
    group: "balance",
    aliases: ["casino"],
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        const win = Math.random()
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        const amount = parseInt(args[0])
        if(!isNumber(amount) || amount <= 0) return await message.channel.createMessage(`> :x: **Введена неверная ставка.**`)
        if(amount > Number(bal.value)) return await message.channel.createMessage(`> :x: **У вас нет столько валюты. Ваш баланс: ${Number(bal.value)} <:rscredit:767386949400657932>**`)
        if(win > 0.5){
            await bal.update({value: Number(bal.value) + amount})
            await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: "Казино",
                        value: `:tada: **Вы выиграли ${amount}** <:rscredit:767386949400657932>. Ваш новый баланс: ${Number(bal.value)} <:rscredit:767386949400657932>`
                    }
                ],
                color: embColor
            })
        }else if(win.toString().startsWith("0.01")){
            await bal.update({value: Number(bal.value) + amount*4})
            await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: "Казино",
                        value: `:tada::tada::tada: **Вы получили Х4 выигрыш! Ваш новый баланс: ${Number(bal.value)} <:rscredit:767386949400657932>**`
                    }
                ],
                color: embColor,
            })
        }
        else if(!win < 0.5){
            await bal.update({value: Number(bal.value) - amount})
            await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: "Казино",
                        value: `**Вы проиграли ${amount}** <:rscredit:767386949400657932>. Ваш новый баланс: ${Number(bal.value)} <:rscredit:767386949400657932>`
                    }
                ],
                color: embColor
            })
        }
    }
}