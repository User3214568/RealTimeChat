var express = require('express')
var Guser = require('../database/Guser')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var router = express.Router()
var {validationLogin,validationSignup,validationResult} = require('../middlewares/dataValidation')




router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/userpage',(req,res)=>{
    res.render('userpage',{user : req.session.user,connected : connected})
})

router.post('/signin',...validationLogin,(req,res)=>{
    Guser.login(req.body,function(user){
        req.session.user = user
        const token = jwt.sign({user_id : req.body.email},"pkeysec2021",{expiresIn : "1h"})
        user.token = token
        res.status(200).send({user : user,token : token})
    },function(err){
        res.status(400).send({errors : err})
    })
})

router.post('/signup',...validationSignup,(req,res)=>{
    //console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({
            success: false,
            errors: errors.array()
        });
    }else{

        Guser.createUser(req.body,(user)=>{
            req.session.user = user
            const token = jwt.sign({user_id : req.body.email},"pkeysec2021",{expiresIn : "1h"})
            user.token = token
            res.status(200).json({user:user,token : token})
        },(err)=>{
            res.status(400).send('Cannot sign up user')
        })
    }
})
router.get('/logout',function(req,res){
    
    exclusiveAction(function(){
        delete  connected[req.sessionID]
        req.session.user = undefined
    }).then(function(){
        res.redirect('/dashboard')
    }).catch(function(){
        //console.log('Cannot set remove user from connected array')
    })

})
router.get('/isauth',function(req,res){
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,'pkeysec2021',(err,user)=>{
            if (err) {
                //console.log('false auth')
                return res.send({auth : false})
            }
            //console.log('authenticated')
            res.send({auth:true})
        })
    }else{
        //console.log('false auth')
        return res.send({auth : false})
    }
})

module.exports = [router]
