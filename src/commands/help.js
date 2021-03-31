module.exports = {
    name: "help",
    usage: "help_usage",
    description: "help_desc",
    aliases: ["h"],
    async execute(client, message, args, prefix, embColor, lang){
        if(args[0]){
            const cmd = client.commands.filter(c => c.group != "dev").find(c => c.name == args[0]) || client.commands.filter(c => c.group != "dev").find(c => c.aliases && c.aliases.includes(args[0]))
            if(!cmd) return await message.channel.createMessage(lang.help_cmd_not_found)
            const embed = {
                title: lang.help_info(cmd.name),
                fields: [
                    {
                        name: lang.usage,
                        value: `\`\`\`${prefix}${cmd.name} ${lang[cmd.usage] || ""}\`\`\``
                    },
                    {
                        name: lang.desc,
                        value: lang[cmd.description]
                    },
                    {
                        name: lang.aliases,
                        value: cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(", ") || lang.no : lang.no
                    }
                ],
                color: embColor
            }
            return await message.channel.createMessage({embed})
        }else{
        const embed = {
            title: lang.help_list,
            author: {name: client.user.username, icon_url: client.user.avatarURL},
            description: lang.help_embdesc(prefix, this),
            fields: [
                {
                    name: lang.help_ginfo,
                    value: client.commands.filter(c => c.group == "info").map(c => `\`${c.name}\``).join(", ")
                },
                {
                    name: lang.help_gfun,
                    value: client.commands.filter(c => c.group == "fun").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: lang.help_geco,
                    value: client.commands.filter(c => c.group == "balance").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: lang.help_gother,
                    value: client.commands.filter(c => c.group == "other").map(c => `\`${c.name}\``).join(", ")
                },
                {
                    name: lang.help_gmod,
                    value: client.commands.filter(c => c.group == "mod").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                },
                {
                    name: lang.help_gsets,
                    value: client.commands.filter(c => c.group == "settings").map(c => `\`${c.name}\``).join(", "),
                    inline: true
                }
            ],
            color: embColor,
            footer: {text: `v${package.version} © relathyme`}
        }
        return await message.channel.createMessage({embed})
    }
    }
}