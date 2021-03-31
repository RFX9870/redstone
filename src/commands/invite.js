module.exports = {
    name: "invite",
    usage: "invite_usage",
    description: "invite_desc",
    needArgs: true,
    group: "info",
    aliases: ["getinvite", "inviteinfo"],
    async execute(client, message, args, prefix, embColor, lang){
        const inv = args[0].slice(args[0].lastIndexOf("/")+1)
        client.getInvite(inv, true).then(async invite => {
            const {guild} = invite
            const now = Date.now()
            const createdDaysAgo = Math.round((now - guild.createdAt) / (1000 * 60 * 60 * 24))
            const owner = client.users.get(guild.ownerID)
            const embed = new Eris.Embed()
            .title(guild.name)
            .field("ID", guild.id, true)
            if(client.guilds.has(guild.id)) embed.field(lang.owner, owner.tag, true)
            embed.field(lang.created, `${moment(guild.createdAt).format("lll")} (${createdDaysAgo} ${lang.days_ago})`, true)
            if(client.guilds.has(guild.id)) embed.field(lang.members, lang.members_stats(guild), true)
                    .field(lang.channels, lang.channels_stats(guild), true)
                    .field(lang.emoji, lang.emoji_stats(guild), true)
                    .field(lang.roles, guild.roles.size, true)
                    .field(lang.region, guild.region[0].toUpperCase() + guild.region.slice(1), true)
                    embed.field(lang.modlvl, lang.verLvl[guild.verificationLevel], true)
                    .field(lang.features, guild.features.map(f => lang.guild_features[f]).join(", ") || lang.no, true)
                    .color(embColor)
                    .thumbnail(guild.iconURL || "https://cdn.discordapp.com/embed/avatars/0.png")
                    if(invite.channel) embed.footer(`${lang.channel}: #${invite.channel.name}`)
                    if(invite.inviter) embed.author(`${lang.inviter}: ${invite.inviter.tag}`, invite.inviter.avatarURL)
                    if(guild.premiumSubscriptionCount > 0) embed.description(`${guild.premiumTier} ${lang.level}, ${guild.premiumSubscriptionCount} ${lang.boosts}`)
                    return await message.channel.createEmbed(embed)
        }).catch(async error => {
            if(error instanceof Eris.DiscordRESTError) return await message.channel.createMessage(lang.invite_error)
            else throw error
        })
    }
}