module.exports = {
    name: "top",
    usage: "[-g] (глобальный топ)",
    description: "топ-10 пользователей по балансу.",
    group: "balance",
    async execute(client, message, args, prefix, embColor){
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        const balances = (await balance.findAll()).filter(b => b.value != Infinity)
        if(args[0] == "-g"){
            const top = balances.sort((a, b) => a.value-b.value).reverse()
            const place = top.map(e => e.userID).indexOf(message.author.id)+1
            const embed = {
                title: "Глобальный топ",
                description: top.map((b, i) => `${i+1}. ${client.users.has(b.userID) ? client.users.get(b.userID).tag : b.userID} - ${b.value} <:rscredit:767386949400657932>`).slice(0, 10).join("\n"),
                footer: {text: place > 0 ? `Ваша позиция в топе: ${place}, баланс: ${Number(bal.value)}` : `Ваш баланс: ${Number(bal.value)}`},
                color: embColor
            }
            await message.channel.createEmbed(embed)
        }else if (args[0] == "-s"){
            if(!config.owners.includes(message.author.id)) return await this.execute(client, message, [], prefix)
            const guild = client.guilds.get(args[1])
            if(!guild) return await message.channel.createMessage("> :x: **Сервер не найден**")
            const top = balances.filter(b => guild.members.has(b.userID)).sort((a, b) => a.value-b.value).reverse()
            const place = top.map(e => e.userID).indexOf(message.author.id)+1
            const embed = {
                title: `Топ сервера ${guild.name}`,
                description: top.map((b, i) => `${i+1}. ${client.users.has(b.userID) ? client.users.get(b.userID).tag : b.userID} - ${b.value} <:rscredit:767386949400657932>`).slice(0, 10).join("\n"),
                footer: {text: place > 0 ? `Ваша позиция в топе: ${place}, баланс: ${Number(bal.value)}` : `Ваш баланс: ${Number(bal.value)}`},
                color: embColor
            }
            await message.channel.createEmbed(embed)
        }else{
            const top = balances.filter(b => message.guild.members.has(b.userID)).sort((a, b) => a.value-b.value).reverse()
            const place = top.map(e => e.userID).indexOf(message.author.id)+1
            const embed = {
                title: `Топ сервера ${message.guild.name}`,
                description: top.map((b, i) => `${i+1}. ${client.users.has(b.userID) ? client.users.get(b.userID).tag : b.userID} - ${b.value} <:rscredit:767386949400657932>`).slice(0, 10).join("\n"),
                footer: {text: place > 0 ? `Ваша позиция в топе: ${place}, баланс: ${Number(bal.value)}` : `Ваш баланс: ${Number(bal.value)}`},
                color: embColor
            }
            await message.channel.createEmbed(embed)
        }
    }
}