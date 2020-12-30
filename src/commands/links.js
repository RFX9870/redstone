module.exports = {
    name: "links",
    description: "ссылки.",
    group: "info",
    aliases: ["info"],
    async execute(client, message, args, prefix, embColor){
        const embed = {
            fields: [
                {
                    name: "Пригласить бота на сервер",
                    value: `[кликабельно](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
                },
                {
                    name: "Мониторинги",
                    value: "[bots.server-discord.com](https://bots.server-discord.com/612341839093039109)\n[boticord.top](https://boticord.top/bot/612341839093039109)"
                },
                {
                    name: "Исходный код",
                    value: "[кликабельно](https://github.com/RFX9870/redstone)"
                },
                {
                    name: "Redstone support server",
                    value: "[кликабельно](https://discord.gg/WvpFF6h)"
                }
            ],
            color: embColor
        }
        return await message.channel.createMessage({embed})
    }
}