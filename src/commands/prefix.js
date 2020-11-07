module.exports = {
    name: "prefix",
    usage: "[новый префикс]",
    description: "изменяет префикс на сервере.",
    group: "settings",
    async execute(client, message, args, prefix, embColor){
        const newPrefix = args[0]
        if(!newPrefix) {
            const embed = new Eris.Embed()
            .author(message.guild.name, message.guild.iconURL)
            .description(`Префикс на этом сервере - \`\`${prefix}\`\`\nИспользуйте \`${prefix}help\` для получения списка команд.`)
            .color(embColor)
            if(message.member.permission.json.manageGuild) embed.footer(`Вы можете изменить префикс на сервере использовав ${prefix}${this.name} ${this.usage}`)
            return await message.channel.createEmbed(embed)
        }
        if(!message.member.permission.json.manageGuild) return await message.channel.createMessage("> :x: Чтобы изменить префикс вы должны обладать правом \`Управлять сервером\`")
        if(newPrefix.length > 10) return await message.channel.createMessage("> :x: Префикс не может быть длиннее 10 символов.")
        let pr = await prefixes.findOne({where: {serverID: message.guild.id}})
        if(!pr) {
            await prefixes.create({serverID: message.guild.id, value: config.prefix})
            pr = await prefixes.findOne({where: {serverID: message.guild.id}})
        }
        await pr.update({value: newPrefix})
        return await message.channel.createMessage(`> :white_check_mark: Префикс изменен на \`${newPrefix.toLowerCase()}\``)
    }
}