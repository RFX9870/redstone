module.exports = {
    name: "8ball",
    usage: "<вопрос>",
    description: "задать вопрос магическому шару.",
    group: "fun",
    async execute(client, message, args, prefix, embColor){
        const thing = args.join(" ")
        if(!thing.length) return await message.channel.createMessage(`> :x: **Используйте \`${prefix}${this.name} ${this.usage}\`**`)
        const answers = [
            "Зачем?",
            "Да.",
            "Нет.",
            "Ты <:Eblan:749617203132760145>?",
            "Ладно.",
            "Возможно.",
            "<:eto_pizdec:753806551570972732>",
            "чТО&",
            "блять.",
            "АААААААА",
            "Узнали? Согласны?",
            "НЕ ПИШИ ФИГНЮ",
            "<:lol:724963940089593926> а что звучит хайпово",
            "Лети в чс, дибилятор.",
            "Ууу, это просто отстой, жди взлома",
            "САША ЖАМБАЛОВ ТЕБЕ ПИЗДЫ ДАСТ!!!",
            "Ты полушизик",
            "Хейтеры 21TV избили меня и пырнули меня ножом, потом застрелили меня за это!",
            "<:pohuy:754583972238852117>",
            "Нихуя садись пять 5",
            ".O .K",
            "че",
            "Отклонено",
            "ДА ХВАТИТ УЖЕ",
            "НИХРЕНА ТЫ ВЫДУМАЛ",
            "fuck you",
            "Неэкологично",
            "ЧЕ ТЫ КО МНЕ ПРИСОСАЛСЯ ШИЗИК",
            "А?",
            "эта идея\nполная хуйня",
            "вжжж вррр че говориш не слишу",
            "С гитхаба спиздил <:who:761792751716925451>"
        ]
        const embed = {
            title: "Магический шар",
            author: {name: message.author.tag, icon_url: message.author.avatarURL},
            description: thing,
            fields: [
                {
                    name: "Ответ:",
                    value: answers[Math.floor(Math.random() * answers.length)]
                }
            ],
            color: embColor
        }
        await message.channel.createEmbed(embed)
    }
}