module.exports = function(client){
    const endh = 60 - new Date().getMinutes()
    const fn = () => {
        const days = Math.floor((1609459200000 - Date.now()) / 86400000)
        client.editStatus(client.presence.status, {name: `${config.prefix}help || @${client.user.username} 🎄 ${days}d`, type: 5})
    }
    fn()
    setTimeout(() => {
        fn()
        setInterval(fn, 3600000)
    }, endh * 60000)
}