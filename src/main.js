global.Eris = require("eris-additions")(require("eris"))
process.env.TZ = "Etc/Greenwich"
global.config = require("./JSON/config.json")
global.package = require("../package.json")
const client = new Eris.Client(config.token, {getAllUsers: true, restMode: true, defaultImageSize: 512, defaultImageFormat: "png"})

require("./util/commandLoader")(client)
require("./util/langLoader")(client)
require("./util/properties")(Eris)
require("./util/database")
require("./util/depositInc")(client)

client.once("ready", () => require("./events/ready")(client))
.on("messageCreate", require("./events/messageCreate"))
.on("messageUpdate", require("./events/messageUpdate"))
.on("guildCreate", require("./events/guildCreate"))
.on("guildDelete", require("./events/guildDelete"))
.on("error", error => console.log(`WS Error: ${error.message}`))
process.on("unhandledRejection", async reason => await require("./events/unhandledRejection")(reason, client))
.on("uncaughtException", async error => await require("./events/uncaughtException")(error, client))

client.connect()