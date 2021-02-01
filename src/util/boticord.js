async function sendPOST(){
    const fetch = require("node-fetch")
    const res = await fetch(`https://boticord.top/api/stats`, {
        method: "POST",
        headers: {
            Authorization: config.boticord.key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({servers: client.guilds.size, shards: client.shards.size, users: client.users.size})
    })
    res.status == 200 ? console.log("Boticord stats sent!") : console.log(`Boticord returned ${res.status}`)
}

module.exports = function(client){
    if(!config.boticord.enabled) return
    sendPOST(client)
    client.boticord = setInterval(sendPOST, 1800000, client)
}