const fetch = require("node-fetch")

function getname(url) {
    return url.slice(url.lastIndexOf("/"))
}

module.exports = {
    name: "dsay",
    group: "dev",
    aliases: ["devsay"],
    ownerOnly: true,
    async execute(client, message, args, prefix, embColor){
        const say = args.join(" ")
        if(!say && !message.attachments.length) return await message.channel.createMessage(`> :x: **Используйте** \`${prefix}${this.name} ${this.usage}\``)
        const files = []
        if(message.attachments.length) for(const attachment of message.attachments){
            const fname = getname(attachment.url)
            const file = await fetch(attachment.url).then(r => r.buffer())
            files.push({file, name: fname})
        }
        await message.delete().catch(() => void 0)
        await client.createMessage(message.channel.id, say, files)
    }
}