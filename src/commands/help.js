module.exports = {
    name: "help",
    usage: "[команда]",
    description: "показывает список команд или информацию о команде.",
    aliases: ["h"],
    async execute(client, message, args, prefix, embColor){
        if(args[0]){
            const cmd = client.commands.filter(c => c.group != "dev").find(c => c.name == args[0]) || client.commands.filter(c => c.group != "dev").find(c => c.aliases && c.aliases.includes(args[0]))
            if(!cmd) return await message.channel.createMessage("> :x: **Такой команды не существует.**")
            const embed = {
                title: `Информация о команде ${cmd.name}`,
                fields: [
                    {
                        name: "Использование",
                        value: `\`\`\`${prefix}${cmd.name} ${cmd.usage || ""}\`\`\``
                    },
                    {
                        name: "Описание",
                        value: cmd.description
                    },
                    {
                        name: "Алиасы",
                        value: cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(", ") || "Нет" : "Нет"
                    }
                ],
                color: embColor
            }
            message.channel.createMessage({embed})
        }else{
        const embed = {
            title: "Список команд",
            author: {name: client.user.username, icon_url: client.user.avatarURL},
            description: `Префикс: \`${prefix}\`\nДля получения информации о какой-либо команде используйте \`${prefix}${this.name} ${this.usage}\``,
            fields: [
                {
                    name: "Информационные",
                    value: client.commands.filter(c => c.group == "info").map(c => `\`${c.name}\``).join(", ")
                },
                {
                    name: "Развлекательные",
                    value: client.commands.filter(c => c.group == "fun").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: "Экономика",
                    value: client.commands.filter(c => c.group == "balance").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: "Прочие",
                    value: client.commands.filter(c => c.group == "other").map(c => `\`${c.name}\``).join(", ")
                },
                {
                    name: "Модераторские",
                    value: client.commands.filter(c => c.group == "mod").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: "Настройки",
                    value: client.commands.filter(c => c.group == "settings").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                }
            ],
            color: embColor,
            footer: {text: `v${config.version} © RFX9870`}
        }
        return await message.channel.createMessage({embed})
    }
    }
}