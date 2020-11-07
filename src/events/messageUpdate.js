module.exports = function(message, oldMessage){
    if(message.content == oldMessage.content) return
    require("./messageCreate")(message)
}