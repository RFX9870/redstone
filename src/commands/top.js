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
        const top = balances.sort((a, b) => a.value-b.value).reverse()
        switch(args[0]){
            case "-g":{
                const finalTop = []
                for(let i = 0; i < 11; i++){
                    if(!top[i]) continue
                    const user = client.users.get(top[i].userID) || await client.getRESTUser(top[i].userID)
                    if(user.bot || top[i].value <= 0 || top[i].value == Infinity) continue
                    finalTop.push(`${i+1}. ${user.tag} - ${top[i].value} <:rscredit:767386949400657932>`)
                }
                const place = top.map(e => e.userID).indexOf(message.author.id)+1
                const embed = {
                    title: lang.top_global,
                    description: finalTop.join("\n"),
                    footer: {text: place > 0 ? lang.top_place(place, bal.value) : lang.top_balance(bal.value)},
                    color: embColor
                }
                return await message.channel.createEmbed(embed)
            }
            default:{
                const guildTop = top.filter(b => message.guild.members.has(b.userID))
                const finalTop = []
                for(let i = 0; i < 11; i++){
                    if(!top[0]) return await message.channel.createMessage(lang.top_no_top)
                    if(!top[i]) continue
                    const user = client.users.get(top[i].userID) || await client.getRESTUser(top[i].userID)
                    if(!message.guild.members.has(top[i].userID) || user.bot || top[i].value <= 0 || top[i].value == Infinity) continue
                    finalTop.push(`${i+1}. ${user.tag} - ${top[i].value} <:rscredit:767386949400657932>`)
                }
                const place = guildTop.map(b => b.userID).indexOf(message.author.id)+1
                const embed = {
                    title: lang.top_server(message.guild.name),
                    description: finalTop.join("\n"),
                    footer: {text: place > 0 ? lang.top_place(place, bal.value) : lang.top_balance(bal.value)},
                    color: embColor
                }
                if(!finalTop.length) return await message.channel.createMessage(lang.top_no_top)
                return await message.channel.createEmbed(embed)
            }
        }
    }
}