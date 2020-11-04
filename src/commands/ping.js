module.exports = {
    name: "ping",
    usage: "[-v] (показать скорость отправки)",
    description: "показывает пинг бота.",
    group: "info",
    async execute(client, message, args, prefix, embColor){
        if(args[0] == "-v"){
            const now = Date.now()
            const msg = await message.channel.createMessage("...")
            const embed = {
                title: "Пинг",
                fields: [
                    {
                        name: "API",
                        value: `${message.channel.guild.shard.latency} мсек.`,
                        inline: true
                    },
                    {
                        name: "Бот",
                        value: `${Date.now() - now} мсек.`,
                        inline: true
                    }
                ],
                footer: {text: `${client.user.username} © RFX9870`, icon_url: client.user.avatarURL},
                color: embColor
            }
            msg.edit({content: "", embed})
        }else{ 
            const embed = {
                fields: [
                    {
                        name: "Пинг",
                        value: `${message.channel.guild.shard.latency} мсек.`
                    }
                ],
                footer: {text: `${client.user.username} © RFX9870`, icon_url: client.user.avatarURL},
                color: embColor
            }
            await message.channel.createMessage({embed})
        }
    }
}