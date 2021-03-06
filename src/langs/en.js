module.exports = {
    name: "en",
    locale: "en-gb",
    "8ball_usage": "<question>",
    "8ball_desc": "Ask a question to 8ball",
    "8ball_title": "8ball",
    "8ball_answer": "Answer:",
    ascii_usage: "<text>",
    ascii_desc: "Creates ASCII art from text",
    ascii_fail: "> :x: Failed to convert this string.",
    avatar_usage: "[ID, @mention, server, banner or splash]. If not provided, will display your avatar",
    avatar_desc: "Displays avatar of user",
    server_no_icon: "> :x: This server has no icon.",
    server_no_banner: "> :x: This server has no banner.",
    server_no_splash: "> :x: This server has no splash.",
    icon: (name) => `Icon of ${name}`,
    banner: (name) => `Banner of ${name}`,
    splash: (name) => `Splash of ${name}`,
    user_not_found: "> :x: User not found.",
    avatar: (name) => `Avatar of ${name}`,
    balance_usage: "[ID or @mention]. If not provided, will display your balance",
    balance_desc: "Displays user balance",
    balance: "Balance",
    deposit: "Deposit",
    ban_usage: "<ID or @mention> [days to purge (1-7)] [reason]",
    ban_yourself: "> :x: You can't ban yourself.",
    ban_bot: "> :x: Bot can't ban himself.",
    no_reason: "No reason",
    long_reason: "> :x: Reason is too long.",
    ban_higher: "> :x: You can't ban a member what higher then you.",
    banned: (name) => `${name} was banned!`,
    reason: (text) => `Reason: ${text}`,
    ban_failed: "> :x: Failed to ban this member.",
    decode_usage: "<code>",
    decode_desc: "Decodes encoded text",
    decode: "Decode",
    decode_error: "> :x: You can decode only hex.",
    deposit_desc: "Put <:rscredit:767386949400657932> on deposit",
    invalid_amount: "> :x: Invalid amount.",
    deposit_success: "Success!",
    deposit_no_dep: (balance) => `:x: **You don't have that much money on deposit. You have: ${Number(balance)} <:rscredit:767386949400657932>**`,
    no_bal: (balance) => `:x: **You don't have that much money. You have: ${Number(balance)} <:rscredit:767386949400657932>**`,
    deposit_help: "You can deposit <:rscredit:767386949400657932>.\nHowever, you can't use it (transfer, dice) and you will't display in top.\nEvery 4 hours you will recieve 1% from money on deposit. (limit is 250000)",
    usage: "Usage",
    deposit_usage: (prefix, name) => `\`\`\`${prefix}${name} <wd or withdraw> <amount>\n${prefix}${name} <put> <amount>\`\`\``,
    dice_usage: "<bet>",
    dice_desc: "Bets in <:rscredit:767386949400657932>",
    dice_invalid_bet: "> :x: Provided invalid bet.",
    casino: "Casino",
    dice_win: (amount, balance) => `:tada: **You won ${amount}** <:rscredit:767386949400657932>. Your new balance: ${Number(balance)} <:rscredit:767386949400657932>`,
    dice_win_x4: (amount, balance) => `:tada::tada::tada: **You won x4 ${amount}** <:rscredit:767386949400657932>. Your new balance: ${Number(balance)} <:rscredit:767386949400657932>`,
    dice_lose: (amount, balance) => `**You losed ${amount}** <:rscredit:767386949400657932>. Your new balance: ${Number(balance)} <:rscredit:767386949400657932>`,
    distext_usage: "<number> <text>",
    distext_desc: "Distorting your text",
    cmd_usage(prefix, cmd) { return `> :x: Use \`${prefix}${cmd.name} ${this[cmd.usage]}\``},
    distext: "Text distortion",
    dsay_usage: "<text or attachments>",
    embcolor_usage: "<reset, random or color code>",
    embcolor_desc: "Changes your embed color",
    embcolor_color: (color) => `Your color: ${color}`,
    embcolor_usage2(prefix, cmd) { return `Use ${prefix}${cmd.name} ${this[cmd.usage]} to change your color`},
    embcolor_reset: ":white_check_mark: **Color restored!**",
    embcolor_random: ":white_check_mark: **Color set to random!**",
    embcolor_error_t: ":x: Invalid color provided",
    embcolor_error_d: "Example:\n`#123456`, `0x123456` or number from 1 to 16777215",
    embcolor_success: (color) => `:white_check_mark: **Color changed to \`${color}\`!**`,
    encode_usage: "<text>",
    encode_desc: "Encodes english text",
    encode: "Encode",
    encode_tip: "Encoded only english words and numbers",
    help_usage: "[command]",
    help_desc: "Displays info about commands",
    help_cmd_not_found: "> :x: This command doesn't exist.",
    help_info: (name) => `Info about \`${name}\``,
    desc: "Description",
    aliases: "Aliases",
    no: "No",
    help_list: "Command list",
    help_embdesc(prefix, cmd){ return `Prefix: \`${prefix}\`\nTo get info about command use \`${prefix}${cmd.name} ${this[cmd.usage]}\``},
    help_ginfo: "Information",
    help_gfun: "Fun",
    help_geco: "Economy",
    help_gother: "Other",
    help_gmod: "Moderation",
    help_gsets: "Settings",
    invite_usage: "<invite code/link>",
    invite_desc: "Displays info about invite",
    verLvl: ["None", "Low", "Meduim", "High", "Very high"],
    guild_features: {
        INVITE_SPLASH: "invite splash",
        VIP_REGIONS: "384 kb/s voice",
        VANITY_URL: "vanity url",
        VERIFIED: "verified",
        PARTNERED: "partnered",
        PUBLIC: "public",
        COMMERCE: "commerce",
        NEWS: "news channel",
        DISCOVERABLE: "in server discovery",
        FEATURABLE: "featurable server",
        ANIMATED_ICON: "animated icon",
        BANNER: "banner",
        PUBLIC_DISABLED: "public disabled",
        WELCOME_SCREEN_ENABLED: "welcome screen",
        COMMUNITY: "community enabled",
        MEMBER_VERIFICATION_GATE_ENABLED: "membership screening",
        PREVIEW_ENABLED: "server preview"
    },
    owner: "Owner",
    created: "Created",
    days_ago: "days ago",
    members: "Members",
    members_stats: (guild) => `All - ${guild.members.size}
Bots - ${guild.members.filter(m => m.user.bot).length}
                
Online - ${guild.members.filter(m => m.status == "online").length}
Idle - ${guild.members.filter(m => m.status == "idle").length}
DND - ${guild.members.filter(m => m.status == "dnd").length}
Offline - ${guild.members.filter(m => m.status == "offline" || !m.status).length}`,
    channels: "Channels",
    channels_stats: (guild) => `All - ${guild.channels.size}
            
Categories - ${guild.channels.filter(c => c.type == 4).length}
Text - ${guild.channels.filter(c => c.type == 0).length}
Voice - ${guild.channels.filter(c => c.type == 2).length}
News - ${guild.channels.filter(c => c.type == 5).length}`,
    emoji: "Emojis",
    emoji_stats: (guild) => `All - ${guild.emojis.length}
            
Animated - ${guild.emojis.filter(e => e.animated).length}
Static - ${guild.emojis.filter(e => !e.animated).length}`,
    roles: "Roles",
    region: "Region",
    modlvl: "Moderation",
    features: "Features",
    channel: "Channel",
    inviter: "Inviter",
    level: "level",
    boosts: "boosts",
    invite_error: "> :x: This invite does not exist.",
    kick_usage: "<ID or @mention> [reason]",
    kick_yourself: "> :x: You can't kick yourself.",
    kick_bot: "> :x: Bot can't kick himself.",
    kick_higher: "> :x: You can't kick a member what higher then you.",
    kicked: (name) => `${name} was kicked!`,
    kick_failed: "> :x: Failed to kick this member.",
    links_desc: "Links",
    links_invite: "Invite bot to your server",
    clickable: "Clickable",
    links_monitorings: "Monitorings",
    links_source: "Source code",
    pay_usage: "<ID or @mention> <amount>",
    pay_desc: "Transfers money",
    pay_bot: "> :x: You can't transfer money to bot.",
    pay_yourself: "> :x: You can't transfer money to yourself.",
    transfer: "Transfer",
    pay_success: (amount, name) => `:white_check_mark: **Transfered ${amount} <:rscredit:767386949400657932> to ${name}**`,
    ping_usage: "[-v (bot latency)]",
    ping_desc: "Displays bot ping",
    ping: "Ping",
    ms: "ms",
    bot: "Bot",
    prefix_usage: "[new prefix]",
    prefix_desc: "Changes prefix on server",
    prefix_embdesc: (prefix) => `Prefix on this server - \`\`${prefix}\`\`\nUse \`${prefix}help\` to get list of commands.`,
    prefix_tip(prefix, cmd){ return `You can change prefix by typing ${prefix}${cmd.name} ${this[cmd.usage]}`},
    prefix_long: "> :x: Prefix can't be longer than 10 symbols.",
    prefix_success: (prefix) => `> :white_check_mark: **Prefix changed to** \`${prefix.toLowerCase()}\``,
    purge_usage: "<amount>",
    purge_desc: "Purges messages",
    purge_invalid_amount: "> :x: Provided invalid amount. (use from 1 to 100)",
    purge_success: (deleted, arg) => `> :white_check_mark: **Deleted \`\`${deleted-1 == parseInt(arg) ? parseInt(arg) : deleted}\`\` messages. This message will delete in 5 seconds**`,
    random_usage: "[from] <to>",
    random_desc: "Generates random number",
    random: (args) => `Random number from ${!!args[1] ? parseInt(args[0], 10) : 0} to ${parseInt(args[1], 10) || parseInt(args[0], 10)}`,
    reverse_usage: "<text>",
    reverse_desc: "Reverses text",
    reverse: "Reverse",
    role_usage: "<ID or @mention>",
    role_desc: "Displays info about role",
    default_color: "Default",
    role_not_found: "> :x: Role not found.",
    role_position: "Position",
    role_managed: "Managed by integration?",
    yes: "Yes",
    role_mentionable: "Mentionable?",
    role_hosted: "Hoisted?",
    role_members: "Members with role",
    na: "N/A",
    color: "Color",
    say_usage: "<text and/or image>",
    server_desc: "Displays info about server",
    softban_usage: "<ID or @mention> <days to purge (1-7)> [reason]",
    softban_desc: "Kicks member and purges messages",
    softban_yourself: "> :x: You can't softban yourself.",
    softban_bot: "> :x: Bot can't softban himself.",
    softban_higher: "> :x: You can't softban a member what higher then you.",
    softbanned: (name) => `${name} was softbanned!`,
    softban_failed: "> :x: Failed to softban this member.",
    softban_error: "> :x: Provided invalid days. (use from 1 to 7)",
    stats_usage: "[-v (verbose output)]",
    stats_desc: "Displays bot stats",
    stats: "Stats",
    stats_uptime: "Uptime",
    d: ":",
    h: ":",
    m: ":",
    s: "",
    stats_uptime_c: "Uptime (client)",
    stats_uptime_h: "Uptime (host)",
    stats_servers: "Servers",
    stats_users: "Users",
    stats_channels: "Channels",
    stats_uses: "Commands used",
    stats_platform: "Platform",
    stats_packages: "Used packages",
    stats_ram: "RAM usage",
    mb: "MB",
    stats_cpu: "CPU",
    top_usage: "[-g (global top)]",
    top_desc: "Top-10 of users with <:rscredit:767386949400657932>",
    top_global: "Global top",
    top_place: (place, balance) => `Your position: ${place}, balance: ${Number(balance)}`,
    top_balance: (balance) => `Your balance: ${Number(balance)}`,
    top_server: (name) => `Top of ${name}`,
    top_no_top: "> :x: Top is not formed on this server.",
    unwarn_usage: "<warn ID>",
    unwarn_desc: "Removes warn from user",
    user_usage: "[ID or @mention]",
    user_desc: "Displays info about user",
    online: "Online",
    idle: "Idle",
    dnd: "DND",
    offline: "Offline",
    invisible: "Invisible",
    types: ["Playing", "Streaming", "Listening to", "Watching", "Custom status", "Competing in"],
    user_bot: "Bot?",
    user_status: "Status",
    user_registered: "Registered",
    user_joined: "Joined server",
    user_tops: "Positions in tops",
    user_roles: "Roles",
    user_no_top: "not displayed in top",
    global: "Global",
    server: "Server",
    place: "place",
    ending: (index) => {
        if(index.toString().endsWith(1) && index != 11) return "st"
        if(index.toString().endsWith(2) && index != 12) return "nd"
        if(index.toString().endsWith(3) && index != 13) return "rd"
        return "th"
    },
    member: "member",
    warn_now_found: "> :x: Warn not found.",
    unwarned: (name) => `${name} was unwarned`,
    warn_usage: "<ID or @mention> [reason]",
    warn_yourself: "> :x: You can't warn yourself.",
    warn_bot: "> :x: Bot can't warn himself.",
    warn_error: "> :x: User can't have more than 25 warns",
    warned: (warnid, name) => `${name} was warned! (warn ID: ${warnid})`,
    warns_usage: "[ID or @mention]",
    warns_desc: "Displays warns of user",
    warns: "Warns of",
    warns_mod: "Mod",
    all: "All",
    work_desc: "Earn <:rscredit:767386949400657932>",
    work_cooldown: (time) => `:x: **Work will be avaliable in ${time} minutes**`,
    work_success: (worked, balance) => `You earned ${worked} <:rscredit:767386949400657932>. Your balance: ${Number(balance)} <:rscredit:767386949400657932>.`,
    work: "Work",
    embed_error: "> :x: Bot must have `Embed links` permission.",
    banMembers: "Ban members",
    kickMembers: "Kick members",
    manageMessages: "Manage messages",
    manageGuild: "Manage guild",
    no_user_permission(permission){ return `> :x: You must have \`${this[permission]}\` to use this command.`},
    no_bot_permission(permission){ return `> :x: Bot must have \`${this[permission]}\` to use this command.`},
    cmd_error: "An error occured while executing command",
    lang_usage: "[new lang]",
    lang_desc: "Changes your language",
    lang_embdesc: (client) => `Avaliable languages: ${client.langs.map(l=>l.name).join(", ")}`,
    lang_tip(prefix, cmd){ return `You can change language by typing ${prefix}${cmd.name} ${this[cmd.usage]}`},
    lang_not_found: "> :x: Language not found."
}