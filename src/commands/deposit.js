module.exports = {
    name: "deposit",
    usage: "<help>",
    description: "deposit_desc",
    group: "balance",
    aliases: ["dep"],
    async execute(client, message, args, prefix, embColor, lang){
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        const success_embed = (b, d) => {
            return {
                title: lang.deposit_success,
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                fields: [
                    {
                        name: lang.balance,
                        value: `${Number(b)} <:rscredit:767386949400657932>`,
                        inline: true
                    },
                    {
                        name: lang.deposit,
                        value: `${Number(d)} <:rscredit:767386949400657932>`,
                        inline: true
                    }
                ],
                color: embColor
            }
        }
        const amount = parseInt(args[1])
        switch(args[0]){
            case "withdraw": case "wd":{
                if((!isNumber(amount) || amount <= 0)) return await message.channel.createMessage(lang.invalid_amount)
                if(amount > Number(bal.deposit)) return await message.channel.createEmbed({
                    author: {name: message.author.tag, icon_url: message.author.avatarURL},
                    fields: [
                        {
                            name: lang.deposit,
                            value: lang.deposit_no_dep(bal.deposit)
                        }
                    ],
                    color: embColor
                })
                await bal.update({value: bal.value+amount, deposit: bal.deposit-amount})
                return await message.channel.createEmbed(success_embed(bal.value, bal.deposit))
            }
            case "put":{
                if((!isNumber(amount) || amount <= 0)) return await message.channel.createMessage(lang.invalid_amount)
                if(amount > Number(bal.value)) return await message.channel.createEmbed({
                    author: {name: message.author.tag, icon_url: message.author.avatarURL},
                    fields: [
                        {
                            name: lang.deposit,
                            value: lang.no_bal(bal.value)
                        }
                    ],
                    color: embColor
                })
                await bal.update({value: bal.value-amount, deposit: bal.deposit+amount})
                return await message.channel.createEmbed(success_embed(bal.value, bal.deposit))
            }
            case "help": default:{
                const embed = new Eris.Embed()
                .title(lang.deposit)
                .description(lang.deposit_help)
                .field(lang.usage, lang.deposit_usage(prefix, this.name))
                .color(embColor)
                return await message.channel.createEmbed(embed)
            }
        }
    }
}