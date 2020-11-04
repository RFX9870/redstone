function isNumber(n){ return !isNaN(parseFloat(n)) && !isNaN(n - 0)}

module.exports = {
    name: "deposit",
    usage: "<help>",
    description: "положить <:rscredit:767386949400657932> на депозит.",
    group: "balance",
    aliases: ["dep"],
    async execute(client, message, args, prefix, embColor){
        if(!args[0] && !args[1] || !["wd", "withdraw", "put", "help"].includes(args[0])) return await this.execute(client, message, ["help"], prefix, embColor)
        let bal = await balance.findOne({where: {userID: message.author.id}})
        if(!bal) {
            await balance.create({userID: message.author.id, value: 0, deposit: 0})
            bal = await balance.findOne({where: {userID: message.author.id}})
        }
        const amount = parseInt(args[1])
        if((!isNumber(amount) || amount <= 0) && !!args[1]) return await message.channel.createMessage("> :x: **Введено неверное количество.**")
        const success_embed = (b, d) => {
            return {
                title: "Успешно!",
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                fields: [
                    {
                        name: "Баланс",
                        value: `${Number(b)} <:rscredit:767386949400657932>`,
                        inline: true
                    },
                    {
                        name: "Депозит",
                        value: `${Number(d)} <:rscredit:767386949400657932>`,
                        inline: true
                    }
                ],
                color: embColor
            }
        }
        if(args[0] == "withdraw" || args[0] == "wd"){
            if(amount > Number(bal.deposit)) return await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: "Депозит",
                        value: `:x: **У вас нет столько валюты. У вас на депозите: ${Number(bal.deposit)} <:rscredit:767386949400657932>**`
                    }
                ],
                color: embColor
            })
            await bal.update({value: bal.value+amount, deposit: bal.deposit-amount})
            await message.channel.createEmbed(success_embed(bal.value, bal.deposit))
        }else if(args[0] == "put"){
            if(amount > Number(bal.value)) return await message.channel.createEmbed({
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                fields: [
                    {
                        name: "Депозит",
                        value: `:x: **У вас нет столько валюты. Ваш баланс: ${Number(bal.value)} <:rscredit:767386949400657932>**`
                    }
                ],
                color: embColor
            })
            await bal.update({value: bal.value-amount, deposit: bal.deposit+amount})
            await message.channel.createEmbed(success_embed(bal.value, bal.deposit))
        }else if(args[0] == "help"){
            const embed = new Eris.Embed()
            .title("Депозит")
            .description("Вы можете внести <:rscredit:767386949400657932> на депозит.\nПри этом вы не сможете их использовать (переводить, ставить ставки и эта сумма не будет учитываться в топах.) до того, как вы их снимете.\nКаждые 4 часа будет начисляться 1% от суммы на депозите.")
            .field("Использование команды", `\`\`\`${prefix}${this.name} <wd или withdraw> <сумма> - снять деньги\n${prefix}${this.name} <put> <сумма> - положить деньги\`\`\``)
            .color(embColor)
            await message.channel.createEmbed(embed)
        }
    }
}