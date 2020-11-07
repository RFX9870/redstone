function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

module.exports = {
    name: "work",
    description: "дает заработать <:rscredit:767386949400657932>.",
    group: "balance",
    cooldown: new Set(),
    async execute(client, message, args, prefix, embColor){
        const worked = getRandomInt(100, 350)
        if(this.cooldown.has(message.author.id)) return await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: "Работа",
                    value: `:x: **Работа будет доступна через ${Math.floor((message.author.workedTimestamp - Date.now() + 3600000) / 60000)} мин.**`
                }
            ],
            color: embColor
        })
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        await bal.update({value: Number(bal.value) + worked})
        return await message.channel.createEmbed({
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            fields: [
                {
                    name: "Работа",
                    value: `Вы заработали ${worked} <:rscredit:767386949400657932>. Ваш баланс: ${Number(bal.value)} <:rscredit:767386949400657932>.`
                }
            ],
            color: embColor
        })
        this.cooldown.add(message.author.id)
		message.author.workedTimestamp = Date.now()
        setTimeout(() => {
            this.cooldown.delete(message.author.id)
        }, 3600000)
    }
}
