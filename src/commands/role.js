const strftime = require("strftime").localize(require("../JSON/strftime_ru.json"))

const color = (x) => {
    let clr = x.toString(16)
    if(clr == 0) return "прозрачный"
    while(clr.length < 6) clr = "0"+clr
    return "#"+clr.toUpperCase()
}

module.exports = {
    name: "role",
    usage: "<ID или @упоминание>",
    description: "показывает информацию о роли.",
    group: "info",
    aliases: ["roleinfo", "r"],
    async execute(client, message, args, prefix, embColor){
        const role = message.guild.roles.get(message.roleMentions[0] || args[0]) || message.guild.roles.find(r => r.name == args.join(" ")) || message.guild.roles.find(r => r.name.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        if(!args[0]) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        if(!role) return await message.channel.createMessage("> :x: **Роль не найдена.**")
        const createdDaysAgo = Math.round((Date.now() - role.createdAt) / (1000 * 60 * 60 * 24))
        const embed = new Eris.Embed()
        .title(role.name)
        .field("ID", role.id, true)
        .field("Создана", strftime(`%d %B %Y года в %H:%M:%S (${createdDaysAgo} дн. назад)`, new Date(role.createdAt)), true)
        .field("Позиция", message.guild.roles.size-role.position, true)
        .field("Управляется интеграцией?", role.managed ? "Да" : "Нет", true)
        .field("Упоминаемая?", role.mentionable ? "Да" : "Нет", true)
        .field("Показывается отдельно?", role.hoist ? "Да" : "Нет", true)
        .field("Участников с этой ролью", message.guild.members.filter(m => m.roles.includes(role.id)).length || "Не доступно", true)
        .field("Цвет", color(role.color), true)
        .color(role.color < 0xffffff ? role.color || embColor : 0xfffffe)
        return await message.channel.createEmbed(embed)
    }
}