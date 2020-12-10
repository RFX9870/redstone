module.exports = function(client){
    console.log("Bot started!")
    client.editStatus("online", {name: `${config.prefix}help || @${client.user.username}`, type: 5})
    require("../util/sdc")(client)
    require("../util/boticord")(client)
    require("../util/countdown")(client)
    client.on("ready", () => console.log("Reconnected!"))
}