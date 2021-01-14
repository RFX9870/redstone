module.exports = function(client){
    const fs = require("fs")
    client.langs = new Eris.Collection()
    const langFiles = fs.readdirSync(`./src/langs`).filter(f => f.endsWith(".js"))
    for(const file of langFiles){
        const lang = require(`../langs/${file}`)
        client.langs.set(lang.name, lang)
        console.log(`${lang.name} - loaded!`)
    }
    console.log(`Loaded ${client.langs.size} langs!`)
}