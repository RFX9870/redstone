module.exports = function(client){
    console.log("DepositInc - loaded!")
    setInterval(async() => {
        const balances = (await balance.findAll()).filter(b => b.deposit != 0)
        for(const bal of balances){
            const sum = Math.round(bal.deposit*0.01)
            await bal.update({deposit: bal.deposit+sum})
            console.log(`Incremented deposit - ${client.users.has(bal.userID) ? client.users.get(bal.userID).tag : bal.userID}, on ${sum}, new dep: ${bal.deposit}`)
        }
    }, 14400000)
}