module.exports = async function uncaughtException(error){
    if(config.errlogger.enabled) await client.executeWebhook(config.errlogger.id, config.errlogger.token, {embeds: [{
        title: "Exception",
        description: `\`\`\`js\n${error.stack}\`\`\``,
        color: config.embColor
    }]})
}