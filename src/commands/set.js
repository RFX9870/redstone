module.exports = {
    name: "set",
    group: "dev",
    async execute(client, message, args, prefix, embColor, lang){
        if(args[0] == "0") return await client.commands.get("cut").execute(client, message, args)
    }
}