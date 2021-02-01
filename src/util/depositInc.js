module.exports = function(){
    client.deposits = setInterval(async() => {
        const balances = (await balance.findAll()).filter(b => b.deposit != 0)
        for(const bal of balances){
            let sum = Math.round(bal.deposit*0.01)
            if(bal.deposit >= 250000) sum = 0
            await bal.update({deposit: bal.deposit+sum})
            console.log(`Incremented deposit - ${client.users.has(bal.userID) ? client.users.get(bal.userID).tag : bal.userID}, on ${sum}, new dep: ${bal.deposit}`)
        }
    }, 14400000)
}