module.exports = function(Eris){
    Eris.User.prototype.pos1 = false
    Eris.User.prototype.pos2 = false
	Eris.User.prototype.workedTimestamp = undefined
    Eris.Member.prototype.dynamicAvatarURL = function(format, size){
        return this.user.dynamicAvatarURL(format, size)
    }
    Object.defineProperties(Eris.User.prototype, {
        "status": {
            get: function(){
                for(const guild of this._client.guilds.values()){
                    if(guild.members.has(this.id)) return guild.members.get(this.id).status
                }
                return "offline"
            }
        },
        "game": {
            get: function(){
                for(const guild of this._client.guilds.values()){
                    if(guild.members.has(this.id)) return guild.members.get(this.id).game
                }
                return null
            }
        },
        "activities": {
            get: function(){
                for(const guild of this._client.guilds.values()){
                    if(guild.members.has(this.id)) return guild.members.get(this.id).activities
                }
                return []
            }
        },
        "clientStatus": {
            get: function(){
                for(const guild of this._client.guilds.values()){
                    if(guild.members.has(this.id)) return guild.members.get(this.id).clientStatus
                }
                return {web: "offline", desktop: "offline", mobile: "offline"}
            }
        }
    })
}