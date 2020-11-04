function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "embcolor",
    usage: "[reset | random | код цвета]",
    description: "изменяет цвет эмбедов.",
    group: "settings",
    aliases: ["embedcolor"],
    async execute(client, message, args, prefix, embColor){
        let clr = await embColors.findOne({where: {userID: message.author.id}})
        if(!clr) {
            await embColors.create({userID: message.author.id, value: 0})
            clr = await embColors.findOne({where: {userID: message.author.id}})
        }
        if(args[0] == "reset"){
            await clr.destroy()
            await message.channel.createEmbed({
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                title: ":white_check_mark: Цвет сброшен!",
                color: config.embColor
            })
        }else if(args[0] == "random"){
            await clr.update({value: -1})
            await message.channel.createEmbed({
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                title: ":white_check_mark: Цвет установлен на случайный!",
                color: config.embColor
            })
        }else{
            const newColor = args[0].startsWith("#") ? parseInt(args[0].slice(1), 16) : parseInt(args[0])
            if(!isNumber(newColor) || newColor < 0 || newColor > 0xffffff) return await message.channel.createEmbed({
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                title: ":x: Указан неверный цвет",
                description: "Примеры правильного цвета (RGB):\n`#123456`, `0x123456` или число от 1 до 16777215",
                color: embColor
            })
            await clr.update({value: newColor})
            const color = (x) => {
                let clr = x.toString(16)
                if(clr == 0) return "#000000"
                while(clr.length < 6) clr = "0"+clr
                return "#"+clr.toUpperCase()
            }
            await message.channel.createEmbed({
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                title: `:white_check_mark: Цвет изменен на \`${color(newColor)}\`!`,
                color: newColor
            })
        }
    }
}