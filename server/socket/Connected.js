class Connected{
    constructor(){
        this.connected = {}
    }
    add(user,socket){
        if(!this.connected[user.email]){
            this.connected[user.email] = {user : user , socket , socket}
        }else{
            this.connected[user.email].socket = socket
        }
    }
    removeByEmail(email){
        if(this.connected[email]){
            delete this.connected[email]
        }
    }
    removeBySocket(socket){
        const keys = Object.keys(this.connected)
        keys.forEach(key=>{
     
            if(this.connected[key].socket === socket){
               
                delete this.connected[key]
                return key
            }
        })
    }
    getUsers(){
        var result = []
        const keys = Object.keys(this.connected)
        keys.forEach(key=>{
            result.push(this.connected[key].user)
            
        })
        return result
    }
    getSocket(email){
        return this.connected[email].socket
    }
}
module.exports = Connected