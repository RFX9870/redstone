function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

const color = (x) => {
    let clr = x.toString(16)
    if(clr == 0) return "#000000"
    while(clr.length < 6) clr = "0"+clr
    return "#"+clr.toUpperCase()
}

module.exports = {
    name: "embcolor",
    usage: "embcolor_usage",
    description: "embcolor_desc",
    group: "settings",
    aliases: ["embedcolor"],
    async execute(client, message, args, prefix, embColor, lang){
        let clr = await embColors.findOne({where: {userID: message.author.id}})
        if(!clr) {
            await embColors.create({userID: message.author.id, value: -2})
            clr = await embColors.findOne({where: {userID: message.author.id}})
        }
        if(!args[0]) return await message.channel.createEmbed({
            author: {
                name: `${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            },
            title: lang.embcolor_color(color(embColor)),
            color: embColor,
            footer: {text: lang.embcolor_usage2(prefix, this)}
        })
        switch(args[0]){
            case "reset":{
                await clr.destroy()
                return await message.channel.createEmbed({
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    },
                    title: lang.embcolor_reset,
                    color: embColor
                })
            }
            case "random":{
                await clr.update({value: -1})
                return await message.channel.createEmbed({
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    },
                    title: lang.embcolor_random,
                    color: embColor
                })
            }default:{
                const newColor = args[0].startsWith("#") ? parseInt(args[0].slice(1), 16) : parseInt(args[0])
                if(!isNumber(newColor) || newColor < 0 || newColor > 0xffffff) return await message.channel.createEmbed({
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    },
                    title: lang.embcolor_error_t,
                    description: lang.embcolor_error_d,
                    color: embColor
                })
                await clr.update({value: newColor})
                return await message.channel.createEmbed({
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    },
                    title: lang.embcolor_success(color(newColor)),
                    color: newColor
                })
            }
        }
    }
}