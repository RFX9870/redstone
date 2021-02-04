module.exports = function ready(){
    console.log("Bot started!")
    client.editStatus("online", {name: `${config.prefix}help || @${client.user.username}`, type: 3})
    client.off("ready", client.listeners("ready")[0])
    client.on("ready", () => console.log("Reconnected!"))
}