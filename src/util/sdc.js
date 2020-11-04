async function sendPOST(client){
    const fetch = require("node-fetch")
    const {stringify} = require("querystring")
    const res = await fetch(`https://api.server-discord.com/v2/bots/${client.user.id}/stats`, {
        method: "POST",
        headers: {
            Authorization: `SDC ${config.sdc.key}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: stringify({
            shards: client.shards.size,
            servers: client.guilds.size
        })
    })
    const json = await res.json()
    if(!json.status) console.log(json)
    else console.log("SDC Stats sent!")
}

module.exports = function(client){
    if(!config.sdc.enabled) return
    sendPOST(client)
    setInterval(sendPOST, 1800000, client)
}