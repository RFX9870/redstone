module.exports = {
    name: "stats",
    usage: "stats_usage",
    description: "stats_desc",
    group: "info",
    async execute(client, message, args, prefix, embColor, lang){
        const uptime = new Date(new Date(process.uptime() * 1000).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        const uptime_c = new Date(new Date(client.uptime).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        const uptime_h = new Date(new Date(require("os").uptime() * 1000).toLocaleString("en-US", {timeZone: "Etc/Greenwich"}))
        let commit
        try{
            const ref = require("fs").readFileSync("./.git/HEAD").toString().slice(5).trim()
            commit = require("fs").readFileSync(`./.git/${ref}`).toString().slice(0, 7)
        }catch{}
        const platforms = {
            "aix": "AIX",
            "android": "Android",
            "cygwin": "Cygwin",
            "darwin": "MacOS",
            "freebsd": "FreeBSD",
            "linux": "Linux",
            "openbsd": "OpenBSD",
            "sunos": "SunOS",
            "win32": "Windows"
        }
        const embed = {
            title: lang.stats,
            fields: [
                {
                    name: lang.stats_uptime,
                    value: `${Math.floor(process.uptime() * 1000 / 86400000)}:${moment(uptime).format("LTS")}`,
                },
                {
                    name: lang.stats_servers,
                    value: client.guilds.size
                },
                {
                    name: lang.stats_users,
                    value: client.users.size
                },
                {
                    name: lang.stats_channels,
                    value: Object.keys(client.channelGuildMap).length
                },
                {
                    name: lang.stats_packages,
                    value: `**Node.js:** ${process.version}\n**Eris:** ${require("eris").VERSION}\n**sqlite3:** ${require("sqlite3").VERSION}\n**Sequelize:** ${require("sequelize").version}`,
                }
            ],
            footer: {text: `${client.user.username} v${package.version} ${commit ? `(${commit})` : ""} © relathyme`, icon_url: client.user.avatarURL},
            color: embColor
        }
        if(args[0] == "-v") {
            embed.fields.splice(1, 0, {
                name: lang.stats_uptime_c,
                value: `${Math.floor(client.uptime / 86400000)}:${moment(uptime_c).format("LTS")}`,
                inline: true
            },
            {
                name: lang.stats_uptime_h,
                value: `${Math.floor(require("os").uptime() * 1000 / 86400000)}:${moment(uptime_h).format("LTS")}`,
                inline: true
            })
            embed.fields[0].inline = true
            embed.fields.splice(6, 0, {
                name: lang.stats_uses,
                value: client.users.filter(u => u.cmdUses).reduce((a, v) => a+v.cmdUses.size, 1),
                inline: true
            },
            {
                name: lang.stats_ram,
                value: `${(process.memoryUsage().heapUsed / (1024*1024)).toFixed(1)} ${lang.mb}`,
                inline: true
            },
            {
                name: lang.stats_cpu,
                value: (require("os").cpus().map(c => c.model)[0] || lang.na) + ` (${process.arch})`,
                inline: true
            })
            embed.fields.push({
                name: lang.stats_platform,
                value: `${platforms[process.platform]} ${require("os").release()}`,
                inline: true
            })
            embed.fields[3].inline = true
            embed.fields[4].inline = true
            embed.fields[5].inline = true
            embed.fields[6].inline = true
            embed.fields[9].inline = true
        }
        return await message.channel.createMessage({embed})
    }
}