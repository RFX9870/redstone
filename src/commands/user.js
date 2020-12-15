const strftime = require("strftime").localize(require("../JSON/strftime_ru.json"))

module.exports = {
    name: "user",
    usage: "[ID или @упоминание]. Если не указано, то будет выведена информация о Вас.",
    description: "показывает информацию о пользователе.",
    group: "info",
    aliases: ["userinfo"],
    async execute(client, message, args, prefix, embColor){
        let user = message.mentions[0] || client.users.get(args[0]) || client.users.find(u => u.username == args.join(" ")) || client.users.find(u => u.tag == args.join(" ")) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!args[0]) user = message.author
        if(!user) {
            try{
                user = await client.getRESTUser(args[0])
                if(!user.id) throw Error("404")
            }catch(e){
                return await message.channel.createMessage("> :x: **Пользователь не найден.**")
            }
        }
        const member = message.channel.guild.members.get(user.id)
        const statuses = {
            "online": "Онлайн",
            "idle": "Не активен",
            "dnd": "Не беспокоить",
            "offline": "Не в сети",
            undefined: "Не в сети"
        }
        const now = Date.now()
        const createdDaysAgo = Math.round((now - user.createdAt) / (1000 * 60 * 60 * 24))
        const joinedDaysAgo = member ? Math.round((now - member.joinedAt) / (1000 * 60 * 60 * 24)) : undefined
        let bal = await balance.findOne({where: {userID: user.id}})
        if(!bal) {
            await balance.create({userID: user.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: user.id}})
        }
        const types = ["Играет в", "Стримит", "Слушает", "Смотрит", "Пользовательский статус", "Соревнуется в"]
        const color = (mem) => {
            let clr = mem.color.toString(16)
            if(clr == 0) return "Нет цвета"
            while(clr.length < 6) clr = "0"+clr
            return "#"+clr.toUpperCase()
        }
        const balances = (await balance.findAll()).filter(b => b.value != Infinity)
        const place_g = balances.sort((a, b) => a.value-b.value).reverse().map(e => e.userID).indexOf(user.id)+1
        const place_s = balances.filter(b => message.guild.members.has(b.userID)).sort((a, b) => a.value-b.value).reverse().map(e => e.userID).indexOf(user.id)+1
        const embed = new Eris.Embed()
        .title(user.tag)
        .field("ID", user.id, true)
        .field("Бот?", user.bot ? "Да" : "Нет", true)
        .field("Статус", statuses[user.status], true)
        .field("Баланс", `${Number(bal.value)} <:rscredit:767386949400657932>`, true)
        .field("Зарегистрировался", strftime(`%d %B %Y года в %H:%M:%S (${createdDaysAgo} дн. назад)`, new Date(user.createdAt)), true)
        .field("Присоединился к серверу", member ? strftime(`%d %B %Y года в %H:%M:%S (${joinedDaysAgo} дн. назад)`, new Date(member.joinedAt)) : "Не доступно", true)
        .field("Топы по балансу", `Глобальный топ: ${place_g ? `${place_g} место` : "не отображается в топе"}\nТоп сервера: ${member ? `${place_s ? `${place_s} место` : "не отображается в топе"}` : "не доступно"}`, true)
        .field("Роли", member ? member.roles.map(r => message.guild.roles.get(r)).sort((a, b) => a.position - b.position).map(r => `<@&${r.id}>`).reverse().join(", ") || "Нет ролей" : "Не доступно", true)
        .field("Цвет", member ? color(member) : "Не доступно", true)
        embed.thumbnail(user.avatarURL || user.defaultAvatarURL)
        .color(member ? member.color < 0xffffff ? member.color || embColor : 0xfffffe : embColor)
        if(member) {
            const index = message.guild.members.map(m=>m).sort((a,b) => a.joinedAt-b.joinedAt).indexOf(member)+1
            const ending = () => {
                if(index.toString().endsWith(2) && index != 12) return "ой"
                if(index.toString().endsWith(3) && index != 13) return "ий"
                if(index.toString().endsWith(6) && index != 16) return "ой"
                if(index.toString().endsWith(7) && index != 17) return "ой"
                if(index.toString().endsWith(8) && index != 18) return "ой"
                return "ый"
            }
            embed.footer(`${index}-${ending()} участник сервера`)
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
            if(!playing || playing.trim().length == 0) playing = "N/A"
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