module.exports = async function guildDelete(guild){
    if(config.logger.enabled) await guild._client.executeWebhook(config.logger.id, config.logger.token, {embeds: [{
        title: "Бот удален с сервера",
        description: `${guild.name} (${guild.id})`,
        color: config.embColor
    }]})
}