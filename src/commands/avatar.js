module.exports = {
    name: "avatar",
    usage: "[ID, @упоминание, server, banner иил splash]. Если не указано, то будет выведен Ваш аватар.",
    description: "показывает аватар пользователя или сервера.",
    group: "info",
    aliases: ["av"],
    async execute(client, message, args, prefix, embColor){
        switch(args[0]){
            case "server":{
                if(!message.channel.guild.icon) return await message.channel.createMessage("> :x: **У этого сервера нет иконки.**")
                let format = "png"
                let size = 4096
                if(message.channel.guild.icon.startsWith("a_")) {format = "gif"; size = 512}
                const embed = {
                    author: {
                        name: `Иконка сервера ${message.channel.guild.name}`,
                        url: message.channel.guild.dynamicIconURL(format, 4096)
                    },
                    image: {url:message.channel.guild.dynamicIconURL(format, size)},
                    color: embColor
                }   
                return await message.channel.createMessage({embed})
            }
            case "banner":{
                if(!message.channel.guild.banner) return await message.channel.createMessage("> :x: **У этого сервера нет баннера.**")
                const embed = {
                    author: {
                        name: `Баннер сервера ${message.channel.guild.name}`,
                        url: message.channel.guild.dynamicBannerURL("png", 4096)
                    },
                    image: {url:message.channel.guild.dynamicBannerURL("png", 4096)},
                    color: embColor
                }   
                return await message.channel.createMessage({embed})
            }
            case "splash":{
                if(!message.channel.guild.splash) return await message.channel.createMessage("> :x: **У этого сервера нет фона приглашения.**")
                const embed = {
                    author: {
                        name: `Фон приглашения сервера ${message.channel.guild.name}`,
                        url: message.channel.guild.dynamicSplashURL("png", 4096)
                    },
                    image: {url:message.channel.guild.dynamicSplashURL("png", 4096)},
                    color: embColor
                }   
                return await message.channel.createMessage({embed})
            }
            default:{
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
                let format = "png"
                let size = 4096
                if(user.avatar && user.avatar.startsWith("a_")) {format = "gif"; size = 512}
                const embed = {
                    author: {
                        name: `Аватар пользователя ${user.username}#${user.discriminator}`,
                        url: user.dynamicAvatarURL(format, 4096)
                    },
                    image: {url:user.dynamicAvatarURL(format, size)},
                    color: embColor
                }
                return await message.channel.createMessage({embed})
            }
        }
    }
}