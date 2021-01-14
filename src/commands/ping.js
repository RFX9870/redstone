module.exports = {
    name: "ping",
    usage: "ping_usage",
    description: "ping_desc",
    group: "info",
    async execute(client, message, args, prefix, embColor, lang){
        if(args[0] == "-v"){
            const now = Date.now()
            const msg = await message.channel.createMessage("...")
            const embed = {
                title: lang.ping,
                fields: [
                    {
                        name: "API",
                        value: `${message.channel.guild.shard.latency} ${lang.ms}`,
                        inline: true
                    },
                    {
                        name: lang.bot,
                        value: `${Date.now() - now} ${lang.ms}`,
                        inline: true
                    }
                ],
                footer: {text: `${client.user.username} © RFX9870`, icon_url: client.user.avatarURL},
                color: embColor
            }
            return await msg.edit({content: "", embed})
        }else{ 
            const embed = {
                fields: [
                    {
                        name: lang.ping,
                        value: `${message.channel.guild.shard.latency} ${lang.ms}`
                    }
                ],
                footer: {text: `${client.user.username} © RFX9870`, icon_url: client.user.avatarURL},
                color: embColor
            }
            return await message.channel.createMessage({embed})
        }
    }
}