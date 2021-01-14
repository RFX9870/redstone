module.exports = {
    name: "top",
    usage: "top_usage",
    description: "top_desc",
    group: "balance",
    async execute(client, message, args, prefix, embColor, lang){
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
                title: lang.top_global,
                description: top.map((b, i) => `${i+1}. ${client.users.has(b.userID) ? client.users.get(b.userID).tag : b.userID} - ${b.value} <:rscredit:767386949400657932>`).slice(0, 10).join("\n"),
                footer: {text: place > 0 ? lang.top_place(place, bal.value) : lang.top_balance(bal.value)},
                color: embColor
            }
            return await message.channel.createEmbed(embed)
        }else{
            const top = balances.filter(b => message.guild.members.has(b.userID)).sort((a, b) => a.value-b.value).reverse()
            const place = top.map(e => e.userID).indexOf(message.author.id)+1
            const embed = {
                title: lang.top_server(message.guild.name),
                description: top.map((b, i) => `${i+1}. ${client.users.has(b.userID) ? client.users.get(b.userID).tag : b.userID} - ${b.value} <:rscredit:767386949400657932>`).slice(0, 10).join("\n"),
                footer: {text: place > 0 ? lang.top_place(place, bal.value) : lang.top_balance(bal.value)},
                color: embColor
            }
            return await message.channel.createEmbed(embed)
        }
    }
}