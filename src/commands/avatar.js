module.exports = {
    name: "avatar",
    usage: "[ID, @упоминание или server]. Если не указано, то будет выведен Ваш аватар.",
    description: "показывает аватар пользователя или сервера.",
    group: "info",
    aliases: ["av"],
    async execute(client, message, args, prefix, embColor){
        if(args[0] == "server"){
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
            await message.channel.createMessage({embed})
        }else{
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
            await message.channel.createMessage({embed})
        }
    }
}