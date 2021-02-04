module.exports = async function guildCreate(guild){
    if(config.logger.enabled) await guild._client.executeWebhook(config.logger.id, config.logger.token, {embeds: [{
        title: "Бот добавлен на сервер",
        description: `${guild.name} (${guild.id})`,
        color: config.embColor
    }]})
}