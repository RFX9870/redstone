module.exports = {
    name: "8ball",
    usage: "8ball_usage",
    description: "8ball_desc",
    needArgs: true,
    group: "fun",
    aliases: ["8b"],
    async execute(client, message, args, prefix, embColor, lang){
        const thing = args.join(" ")
        const answers = [
            "Да.",
            "Нет.",
            "блять.",
            "зачем.",
            "<:bruh:715978151292829708> класс ты гений",
            ".O .K",
            "ахахаха",
            "<:lol:724963940089593926> а что звучит хайпово",
            "а что звучит не звучит блять",
            "ёперный театор",
            "это просто анекдот дня <:lulzfacepalm:796329558760357938>",
            "вот это идеи ты <:Eblan:749617203132760145> чтоли??7",
            "<:chel:713029341000368239>",
            "ладно.",
            "давай!! ДАВАААЙ УРАА ДАВААЙ ДАААВАААЙ",
            "ну можно аче",
            "нахуя а главное зачем",
            "попрыгунчик нашелся",
            "чудо природы красный огурец",
            "ахаха блять бегающий гвоздь ахахахахаха",
            "его идеи полная хуйня",
            "щас будет ржака",
            "ильнура с днем рождения",
            "вера отдай ключи",
            "<:who:761792751716925451>",
            "выглядит как электрическая говноварка",
            "я такие загадки не решаю",
            "<:vsempohuy:792746747516289036> Всем интересно",
            "Тупая игра и разработчики тупые но мне понравилось потому что я тоже тупой !",
            "Я обязательно выживу..."
        ]
        const embed = {
            title: lang["8ball_title"],
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: thing,
            fields: [
                {
                    name: lang["8ball_answer"],
                    value: answers[Math.floor(Math.random() * answers.length)]
                }
            ],
            color: embColor
        }
        return await message.channel.createEmbed(embed)
    }
}