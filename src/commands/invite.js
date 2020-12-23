const strftime = require("strftime").localize(require("../JSON/strftime_ru.json"))

module.exports = {
    name: "invite",
    usage: "<инвайт-код/ссылка>",
    description: "показывает информацию о приглашении.",
    group: "info",
    aliases: ["getinvite"],
    async execute(client, message, args, prefix, embColor){
        if(!args[0]) return await message.channel.createMessage(`> :x: **Использование:** \`${prefix}${this.name} ${this.usage}\``)
        const inv = args[0].slice(args[0].lastIndexOf("/")+1)
        client.getInvite(inv, true).then(async invite => {
            const {guild} = invite
            const verLvl = ["Отсутствует", "Низкий", "Средний", "Высокий", "Самый высокий"]
            const now = Date.now()
            const createdDaysAgo = Math.round((now - guild.createdAt) / (1000 * 60 * 60 * 24))
            const owner = client.users.get(guild.ownerID)
            const features = {
                INVITE_SPLASH: "фон приглашения",
                VIP_REGIONS: "384 кб/с голосовой канал",
                VANITY_URL: "свой инвайт-код",
                VERIFIED: "верифицированный сервер",
                PARTNERED: "партнерский сервер",
                PUBLIC: "публичный сервер",
                COMMERCE: "поммерческий сервер",
                NEWS: "новостной канал",
                DISCOVERABLE: "доступен в обзоре серверов",
                FEATURABLE: "предлагаемый сервер",
                ANIMATED_ICON: "анимированный значок",
                BANNER: "баннер",
                PUBLIC_DISABLED: "не может быть публичным",
                WELCOME_SCREEN_ENABLED: "экран приветствия",
                COMMUNITY: "сервер сообщества",
                MEMBER_VERIFICATION_GATE_ENABLED: "отбор участников",
                PREVIEW_ENABLED: "превью сервера"
            }
            const embed = new Eris.Embed()
            .title(guild.name)
            .field("ID", guild.id, true)
            if(client.guilds.has(guild.id)) embed.field("Владелец", owner.tag, true)
            embed.field("Создан", strftime(`%d %B %Y года в %H:%M:%S (${createdDaysAgo} дн. назад)`, new Date(guild.createdAt)), true)
            if(client.guilds.has(guild.id)) embed.field("Участники", 
            `Всего - ${guild.members.size}
Ботов - ${guild.members.filter(m => m.user.bot).length}
            
Онлайн - ${guild.members.filter(m => m.status == "online").length}
Не активен - ${guild.members.filter(m => m.status == "idle").length}
Не беспокоить - ${guild.members.filter(m => m.status == "dnd").length}
Не в сети - ${guild.members.filter(m => m.status == "offline" || !m.status).length}`, true)
                    .field("Каналы", 
            `Всего - ${guild.channels.size}
            
Категории - ${guild.channels.filter(c => c.type == 4).length}
Текстовые - ${guild.channels.filter(c => c.type == 0).length}
Голосовые - ${guild.channels.filter(c => c.type == 2).length}
Новостные - ${guild.channels.filter(c => c.type == 5).length}`, true)
                    .field("Эмодзи", 
            `Всего - ${guild.emojis.length}
            
Анимированные - ${guild.emojis.filter(e => e.animated).length}
Статичные - ${guild.emojis.filter(e => !e.animated).length}`, true)
                    .field("Ролей", guild.roles.size, true)
                    .field("Регион", guild.region[0].toUpperCase() + guild.region.slice(1), true)
                    embed.field("Уровень проверки", verLvl[guild.verificationLevel], true)
                    .field("Функции", guild.features.map(f => features[f]).join(", ") || "Нет", true)
                    .color(embColor)
                    .thumbnail(guild.iconURL || "https://cdn.discordapp.com/embed/avatars/0.png")
                    if(invite.channel) embed.footer(`Канал: #${invite.channel.name}`)
                    if(invite.inviter) embed.author(`Приглашающий: ${invite.inviter.tag}`, invite.inviter.avatarURL)
                    if(guild.premiumSubscriptionCount > 0) embed.description(`${guild.premiumTier} уровень, ${guild.premiumSubscriptionCount} бустов`)
                    return await message.channel.createEmbed(embed)
        }).catch(async error => {
            if(error instanceof Eris.DiscordRESTError) return await message.channel.createMessage("> :x: Такого приглашения не существует.")
            else throw error
        })
    }
}