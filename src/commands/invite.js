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
            const verLvl = ["Отсутствует", "Низкий", "Средний", "Высокий", "Самый высокий"]
            const embed = {
                title: invite.guild.name,
                fields: [
                    {
                        name: "ID",
                        value: invite.guild.id,
                        inline: true
                    },
                    {
                        name: "Уровень проверки",
                        value: verLvl[invite.guild.verificationLevel],
                        inline: true
                    },
                    {
                        name: "Участники",
                        value: `${invite.memberCount} (${invite.presenceCount} онлайн)`,
                        inline: true
                    }
                ],
                thumbnail: {url: `https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.jpg?size=1024`},
                footer: {text: `Канал: #${invite.channel.name} (ID: ${invite.channel.id})`},
                color: embColor
            }
            if(client.guilds.get(invite.guild.id)){
                const now = Date.now()
                const guild = client.guilds.get(invite.guild.id)
                const owner = client.users.get(guild.ownerID)
                const createdDaysAgo = Math.round((now - guild.createdAt) / (1000 * 60 * 60 * 24))
                embed.fields.splice(2, 1)
                embed.fields.push(
                    {
                        name: "Создан",
                        value: `${strftime(`%d.%m.%Y в %H:%M:%S (${createdDaysAgo} дн. назад)`, new Date(guild.createdAt))}`
                    },
                    {
                        name: "Владелец",
                        value: `${owner.username}#${owner.discriminator}`
                    },
                    {
                        name: "Регион",
                        value: guild.region[0].toUpperCase() + guild.region.slice(1)
                    },
                    {
                        name: "Участники: Люди | Боты | Всего",
                        value: `${guild.members.filter(m => !m.user.bot).length} | ${guild.members.filter(m => m.user.bot).length} | ${guild.members.size}`
                    },
                    {
                        name: "Каналы: Категории | Текстовые | Голосовые | Всего",
                        value: `${guild.channels.filter(c => c.type == 4).length} | ${guild.channels.filter(c => c.type == 0).length} | ${guild.channels.filter(c => c.type == 2).length} | ${guild.channels.size}`
                    },
                    {
                        name: "Эмоджи: Статичные | Анимированные | Всего",
                        value: `${guild.emojis.filter(e => !e.animated).length} | ${guild.emojis.filter(e => e.animated).length} | ${guild.emojis.length}`
                    },
                    {
                        name: "Всего ролей:",
                        value: guild.roles.size
                    }
                )
            }
            if(invite.inviter){
                embed.fields.push({
                    name: "Приглашающий",
                    value: `${invite.inviter.username}#${invite.inviter.discriminator} (ID: ${invite.inviter.id})`
                })
            }
            await message.channel.createMessage({embed})
        }).catch(async () => {
            await message.channel.createMessage("> :x: Такого приглашения не существует.")
        })
    }
}