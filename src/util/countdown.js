module.exports = function(client){
    const endh = 60 - new Date().getMinutes()
    const fn = () => {
        const days = Math.floor((1609448400000 - Date.now()) / 86400000)
        const hours = Math.floor((1609448400000 - Date.now()) % 86400000 / 3600000)
        client.editStatus(client.presence.status, {name: `${config.prefix}help || @${client.user.username} 🎄 ${days}d ${hours}h`, type: 5})
    }
    fn()
    setTimeout(() => {
        fn()
        client.countdown = setInterval(fn, 3600000)
    }, endh * 60000)
}