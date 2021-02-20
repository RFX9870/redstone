module.exports = {
    name: "server",
    description: "server_desc",
    group: "info",
    aliases: ["serverinfo", "s"],
    async execute(client, message, args, prefix, embColor, lang){
        const strftime = require("strftime").localizeByIdentifier(lang.locale)
        const guild = config.owners.includes(message.author.id) ? client.guilds.get(args[0]) || message.guild : message.guild
        const now = Date.now()
        const createdDaysAgo = Math.round((now - guild.createdAt) / (1000 * 60 * 60 * 24))
        const owner = client.users.get(guild.ownerID)
        const embed = new Eris.Embed()
        .title(guild.name)
        .field("ID", guild.id, true)
        .field(lang.owner, owner.tag, true)
        .field(lang.created, strftime(`%d %B %Y, %H:%M:%S (${createdDaysAgo} ${lang.days_ago})`, new Date(guild.createdAt)), true)
        .field(lang.members, lang.members_stats(guild), true)
        .field(lang.channels, lang.channels_stats(guild), true)
        .field(lang.emoji, lang.emoji_stats(guild), true)
        .field(lang.roles, guild.roles.size, true)
        .field(lang.region, guild.region[0].toUpperCase() + guild.region.slice(1), true)
        .field(lang.modlvl, lang.verLvl[guild.verificationLevel], true)
        .field(lang.features, guild.features.map(f => lang.guild_features[f]).join(", ") || lang.no, true)
        .color(embColor)
        .thumbnail(guild.iconURL || "https://cdn.discordapp.com/embed/avatars/0.png")
        if(guild.premiumSubscriptionCount > 0) embed.description(`${guild.premiumTier} ${lang.level}, ${guild.premiumSubscriptionCount} ${lang.boosts}`)
        return await message.channel.createMessage({embed})
    }
}