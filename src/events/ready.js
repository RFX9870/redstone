module.exports = function(client){
    console.log("Bot started!")
    client.editStatus("online", {name: `${config.prefix}help || @${client.user.username}`, type: 3})
    require("../util/sdc")(client)
    require("../util/boticord")(client)
    client.on("ready", () => console.log("Reconnected!"))
}