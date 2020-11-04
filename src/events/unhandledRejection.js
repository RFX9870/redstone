module.exports = async function(reason, client){
    if(config.errlogger.enabled) await client.executeWebhook(config.errlogger.id, config.errlogger.token, {embeds: [{
        title: "PromiseRejection",
        description: `\`\`\`js\n${reason instanceof Error ? reason.stack : reason}\`\`\``,
        color: config.embColor
    }]})
}