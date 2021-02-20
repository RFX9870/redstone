module.exports = {
    name: "role",
    usage: "role_usage",
    description: "role_desc",
    needArgs: true,
    group: "info",
    aliases: ["roleinfo", "r"],
    async execute(client, message, args, prefix, embColor, lang){
        const strftime = require("strftime").localizeByIdentifier(lang.locale)
        const color = (x) => {
            let clr = x.toString(16)
            if(clr == 0) return lang.default_color
            while(clr.length < 6) clr = "0"+clr
            return "#"+clr.toUpperCase()
        }
        const role = message.guild.roles.get(message.roleMentions[0] || args[0]) || message.guild.roles.find(r => r.name == args.join(" ")) || message.guild.roles.find(r => r.name.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!role) return await message.channel.createMessage(lang.role_not_found)
        const createdDaysAgo = Math.round((Date.now() - role.createdAt) / (1000 * 60 * 60 * 24))
        const embed = new Eris.Embed()
        .title(role.name)
        .field("ID", role.id, true)
        .field(lang.created, strftime(`%d %B %Y, %H:%M:%S (${createdDaysAgo} ${lang.days_ago})`, new Date(role.createdAt)), true)
        .field(lang.role_position, message.guild.roles.size-role.position, true)
        .field(lang.role_managed, role.managed ? lang.yes : lang.no, true)
        .field(lang.role_mentionable, role.mentionable ? lang.yes : lang.no, true)
        .field(lang.role_hoisted, role.hoist ? lang.yes : lang.no, true)
        .field(lang.role_members, message.guild.members.filter(m => m.roles.includes(role.id)).length || lang.na, true)
        .field(lang.color, color(role.color), true)
        .color(role.color < 0xffffff ? role.color || embColor : 0xfffffe)
        return await message.channel.createEmbed(embed)
    }
}