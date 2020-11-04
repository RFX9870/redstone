const strftime = require("strftime")

const {VERSION: erisVersion} = require("eris")

const {VERSION: sqlite3Version} = require("sqlite3").verbose()

const {version: sequelizeVersion} = require("sequelize")

module.exports = {
    name: "stats",
    usage: "[-v] (показывает расширенную статистику)",
    description: "показывает статистику бота.",
    group: "info",
    async execute(client, message, args, prefix, embColor){
        const uptime = new Date(new Date(process.uptime() * 1000).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        const uptime_c = new Date(new Date(client.uptime).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        const uptime_h = new Date(new Date(require("os").uptime() * 1000).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        const embed = {
            title: "Статистика",
            fields: [
                {
                    name: "Аптайм",
                    value: `${Math.floor(process.uptime() * 1000 / 86400000)} дн. ${strftime("%H ч. %M мин. %S сек.", uptime)}`,
                },
                {
                    name: "Серверов",
                    value: client.guilds.size
                },
                {
                    name: "Пользователей",
                    value: client.users.size
                },
                {
                    name: "Используемые пакеты",
                    value: `**Node.js:** ${process.version}\n**Eris:** ${erisVersion}\n**sqlite3:** ${sqlite3Version}\n**Sequelize:** ${sequelizeVersion}`,
                }
            ],
            footer: {text: `${client.user.username} v${config.version} © RFX9870`, icon_url: client.user.avatarURL},
            color: embColor
        }
        if(args[0] == "-v") {
            embed.fields.splice(1, 0, {
                name: "Аптайм (клиент)",
                value: `${Math.floor(client.uptime / 86400000)} дн. ${strftime("%H ч. %M мин. %S сек.", uptime_c)}`,
                inline: true
            },
            {
                name: "Аптайм (хост)",
                value: `${Math.floor(require("os").uptime() * 1000 / 86400000)} дн. ${strftime("%H ч. %M мин. %S сек.", uptime_h)}`,
                inline: true
            })
            embed.fields[0].inline = true
            embed.fields.splice(6, 0, {
                name: "Использовано ОЗУ",
                value: `${(process.memoryUsage().heapUsed / (1024*1024)).toFixed(1)} МБ`,
                inline: true
            },
            {
                name: "Процессор",
                value: (require("os").cpus().map(c => c.model)[0] || "Не доступно") + ` (${process.arch})`,
                inline: true
            })
            embed.fields[5].inline = true
        }
        await message.channel.createMessage({embed})
    }
}