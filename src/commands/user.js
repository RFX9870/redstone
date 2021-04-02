module.exports = {
    name: "user",
    usage: "user_usage",
    description: "user_desc",
    group: "info",
    aliases: ["userinfo", "u"],
    async execute(client, message, args, prefix, embColor, lang){
        const color = (mem) => {
            let clr = mem.color.toString(16)
            if(clr == 0) return lang.default_color
            while(clr.length < 6) clr = "0"+clr
            return "#"+clr.toUpperCase()
        }
        let user = message.mentions[0] || client.users.get(args[0]) || client.users.find(u => u.username == args.join(" ")) || client.users.find(u => u.tag == args.join(" ")) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!args[0]) user = message.author
        if(!user) {
            try{
                user = await client.getRESTUser(args[0])
                if(!user.id) throw Error("404")
            }catch(e){
                return await message.channel.createMessage(lang.user_not_found)
            }
        }
        const member = message.channel.guild.members.get(user.id)
        const statuses = {
            "online": lang.online,
            "idle": lang.idle,
            "dnd": lang.dnd,
            "offline": lang.offline,
            "invisible": lang.invisible,
            undefined: lang.offline
        }
        const now = Date.now()
        const createdDaysAgo = Math.round((now - user.createdAt) / (1000 * 60 * 60 * 24))
        const joinedDaysAgo = member ? Math.round((now - member.joinedAt) / (1000 * 60 * 60 * 24)) : undefined
        let bal = await balance.findOne({where: {userID: user.id}})
        if(!bal) {
            await balance.create({userID: user.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: user.id}})
        }
        const {types} = lang
        const balances = (await balance.findAll()).filter(b => b.value != Infinity)
        const place_g = balances.sort((a, b) => a.value-b.value).reverse().map(e => e.userID).indexOf(user.id)+1
        const place_s = balances.filter(b => message.guild.members.has(b.userID)).sort((a, b) => a.value-b.value).reverse().map(e => e.userID).indexOf(user.id)+1
        const embed = new Eris.Embed()
        .title(user.tag)
        .field("ID", user.id, true)
        .field(lang.user_bot, user.bot ? lang.yes : lang.no, true)
        if(client.users.has(user.id)) embed.field(lang.user_status, statuses[user.status], true)
        if(!user.bot) embed.field(lang.balance, `${Number(bal.value)} <:rscredit:767386949400657932>`, true)
        embed.field(lang.user_registered, `${moment(user.createdAt).format("lll")} (${createdDaysAgo} ${lang.days_ago})`, true)
        if(member) embed.field(lang.user_joined, member ? `${moment(member.joinedAt).format("lll")} (${joinedDaysAgo} ${lang.days_ago})` : lang.na, true)
        if(!user.bot) embed.field(lang.user_tops, `${lang.global}: ${place_g ? `${place_g} ${lang.place}` : lang.user_no_top}\n${lang.server}: ${member ? `${place_s ? `${place_s} ${lang.place}` : lang.user_no_top}` : lang.na}`, true)
        if(member) embed.field(lang.user_roles, member ? member.roles.map(r => message.guild.roles.get(r)).sort((a, b) => a.position - b.position).map(r => `<@&${r.id}>`).reverse().join(", ") || lang.no : lang.na, true)
        if(member) embed.field(lang.color, member ? color(member) : lang.na, true)
        embed.thumbnail(user.avatarURL || user.defaultAvatarURL)
        .color(member ? member.color < 0xffffff ? member.color || embColor : 0xfffffe : embColor)
        if(member) {
            const index = message.guild.members.map(m=>m).sort((a,b) => a.joinedAt-b.joinedAt).indexOf(member)+1
            embed.footer(`${index}${lang.ending(index)} ${lang.member}`)
        }
        if(user.game) {
            let playing = user.game.type == 4 ? user.game.state || "" : user.game.name
            let emoji
            if(user.game.emoji){
                emoji = user.game.emoji.name
                if(user.game.emoji.id) emoji = `<:${user.game.emoji.name}:${user.game.emoji.id}>`
                if(user.game.emoji.animated) emoji = `<a:${user.game.emoji.name}:${user.game.emoji.id}>`
                playing = `${emoji} ${playing}`
            }
            if(user.game.url){
                playing = `[${playing}](${user.game.url})`
            }
            if(!playing || playing.trim().length == 0) playing = lang.na
            if(user.game.type == 4 && !user.game.state && emoji){
                playing = `${emoji} ${user.activities[1] ? `${types[user.activities[1].type]} **${user.activities[1].name}**\n\n${user.activities[1].details || ""}\n${user.activities[1].state || ""}` : ""}`
            }
            if(user.game.type == 4 && user.game.state){
                playing = `${emoji || ""} ${user.game.state}`
            }
            if(user.game.type != 4){
                playing = `${types[user.game.type]} **${playing}**\n\n${user.game.details || ""}\n${user.game.state || ""}`
            }
            embed.description = playing
        }
        return await message.channel.createMessage({embed})
    }
}
