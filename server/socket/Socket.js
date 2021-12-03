var io = require('socket.io')
var cors = require('cors')
var Connected = require('./Connected')


class Socket{

    constructor(server){
        this.socket  = io(server , {
            cors : {
                origin :process.env.REACT_APP
            }
        })
        this.connected = new Connected()
        this.socket.on('connection',(socket)=>this.onConnection(socket))
    }
    onConnection(socket){
        /**
         * Registrate events
         */
        socket.on('REGISTRATE',(user)=>this.onRegistrate(user,socket))
        socket.on('disconnect',()=>this.onDisconnect(socket))
        socket.on('MESSAGE',(message)=>this.onMessage(message,socket))
    }
    onRegistrate(user,socket){
        const newUser = JSON.parse(user)
        this.connected.add(newUser,socket)
        this.socket.emit('USERS_LIST',JSON.stringify(this.connected.getUsers()))
    }
    onDisconnect(socket){
        const email = this.connected.removeBySocket(socket)
        socket.broadcast.emit('USERS_LIST',JSON.stringify(this.connected.getUsers()))
    }
    onMessage(message,socket){
        const msg = JSON.parse(message)
        const sock = this.connected.getSocket(msg.to)
        sock.emit('MESSAGE',message)
    }
}
module.exports = Socket