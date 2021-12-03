var sequelize = require('../database/db')
var User = require('../models/User')
class Guser {
 
    static deleteUser(id){

    }
    static updateUser(id,user){

    }
    static createUser(user,callback,failedcb){
        User.create(user).then(user=>{
            callback(user)
        }).catch(err=>{
           failedcb(err)
        })
    }
    static login(creds,cb,failedcb){
        User.findByPk(creds.email).then(user=>{
            if(user){

                if(user.password === creds.password){
                    cb(user)
                }else{
                    failedcb([{param:'password',msg:'Invalid Password'}])
                }
            }else{
                failedcb([{param:'email',msg:'Email doesn\'t match any account'}])
            }
        }).catch(function(err){
            failedcb([{param:'email',msg:'Email doesn\'t match any account'},{param:'password',msg:'Invalid Password'}])

        })
    }
}
module.exports = Guser