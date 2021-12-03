const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validationSignup = [
    check('firstname').notEmpty(),
    check('lastname').notEmpty(),
    check('birthday').notEmpty().isDate(),
    check('email').notEmpty().isEmail().normalizeEmail().custom(function(value){
        if(value === "") return Promise.reject("Invalid Email")
        return User.findByPk(value).then(function(user){
            if(user){
                return Promise.reject("Email Already is use")
            }
        })
    }),
    check('password').notEmpty(),
]
const validationLogin = [
    check('email').notEmpty().isEmail().normalizeEmail().custom(function(value){
        if(value === "") return Promise.reject("Invalid Email")
        return User.findByPk(value).then(function(user){
            if(!user){
                return Promise.reject("Email doesn't match any account")
            }
        })
    }),
    check('password').notEmpty(),
]
module.exports = {
    validationLogin,validationSignup,validationResult
}