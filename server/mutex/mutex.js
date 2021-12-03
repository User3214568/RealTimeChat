var {Mutex , Semaphore,withTimeout} = require('async-mutex')
const mutex = new Mutex()

function exclusiveAction(action){
    return mutex.runExclusive(function(){
        action()
    })
}
module.exports = exclusiveAction