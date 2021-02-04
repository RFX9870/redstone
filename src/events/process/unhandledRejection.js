module.exports = async function unhandledRejection(reason){
    if(config.errlogger.enabled) await client.executeWebhook(config.errlogger.id, config.errlogger.token, {embeds: [{
        title: "PromiseRejection",
        description: `\`\`\`js\n${reason instanceof Error ? reason.stack : reason}\`\`\``,
        color: config.embColor
    }]})
}