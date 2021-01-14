module.exports = {
    name: "links",
    description: "links_desc",
    group: "info",
    aliases: ["info"],
    async execute(client, message, args, prefix, embColor, lang){
        const embed = {
            fields: [
                {
                    name: lang.links_invite,
                    value: `[${lang.clickable}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
                },
                {
                    name: lang.links_monitorings,
                    value: "[bots.server-discord.com](https://bots.server-discord.com/612341839093039109)\n[boticord.top](https://boticord.top/bot/612341839093039109)"
                },
                {
                    name: lang.links_source,
                    value: `[${lang.clickable}](https://github.com/RFX9870/redstone)`
                },
                {
                    name: "Redstone support server",
                    value: `[${lang.clickable}](https://discord.gg/WvpFF6h)`
                }
            ],
            color: embColor
        }
        return await message.channel.createMessage({embed})
    }
}