module.exports = {
    name: "lang",
    usage: "lang_usage",
    description: "lang_desc",
    group: "settings",
    async execute(client, message, args, prefix, embColor, lang){
        if(!args[0]) {
            const embed = new Eris.Embed()
            .author(message.author.tag, message.author.avatarURL)
            .description(lang.lang_embdesc(client))
            .footer(lang.lang_tip(prefix, this))
            .color(embColor)
            return await message.channel.createEmbed(embed)
        }
        if(!client.langs.has(args[0])) return await message.channel.createMessage(lang.lang_not_found)
        let ln = await langs.findOne({where: {userID: message.author.id}})
        if(!ln) {
            await langs.create({userID: message.author.id, value: config.prefix})
            ln = await langs.findOne({where: {userID: message.author.id}})
        }
        await ln.update({value: args[0]})
        return await message.addReaction("✅")
    }
}