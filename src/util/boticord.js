async function sendStats(client){
    const fetch = require("node-fetch")
    const res = await fetch(`https://boticord.top/api/stats?servers=${client.guilds.size}&shards=${client.shards.size}&users=${client.users.size}`, {
        headers: {
            Authorization: config.boticord.key
        }
    })
    res.status == 200 ? console.log("Boticord stats sent!") : console.log(`Boticord returned ${res.status}`)
}

module.exports = function(client){
    if(!config.boticord.enabled) return
    sendStats(client)
    setInterval(sendStats, 1800000, client)
}