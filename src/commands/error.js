module.exports = {
    name: "error",
    group: "dev",
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor, lang){
        throw Error(args.join(" "))
    }
}
