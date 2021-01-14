module.exports = {
    name: "prefix",
    usage: "prefix_usage",
    description: "prefix_desc",
    permissions: {user: "manageGuild"},
    group: "settings",
    async execute(client, message, args, prefix, embColor, lang){
        const newPrefix = args[0]
        if(!newPrefix) {
            const embed = new Eris.Embed()
            .author(message.guild.name, message.guild.iconURL)
            .description(lang.prefix_embdesc(prefix))
            .color(embColor)
            if(message.member.permissions.json.manageGuild) embed.footer(lang.prefix_tip(prefix, this))
            return await message.channel.createEmbed(embed)
        }
        if(newPrefix.length > 10) return await message.channel.createMessage(lang.prefix_long)
        let pr = await prefixes.findOne({where: {serverID: message.guild.id}})
        if(!pr) {
            await prefixes.create({serverID: message.guild.id, value: config.prefix})
            pr = await prefixes.findOne({where: {serverID: message.guild.id}})
        }
        await pr.update({value: newPrefix})
        return await message.channel.createMessage(lang.prefix_success(newPrefix))
    }
}