global.Eris = require("eris-additions")(require("eris"))
process.env.TZ = "Etc/Greenwich"
global.config = require("../config.json")
global.package = require("../package.json")
global.client = new Eris.Client(config.token, {getAllUsers: true, restMode: true, defaultImageSize: 512, defaultImageFormat: "png"})
client.commands = new Eris.Collection()
client.langs = new Eris.Collection()
global.init = require("./init")
for(const key of Object.keys(init)) init[key]()

client.connect()