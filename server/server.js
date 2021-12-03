require('dotenv').config()
var app  = require('express')()
var pug = require('pug')
var router = require('./router/router')
var cors = require('cors')
var bodyParser  = require('body-parser')
var sessions = require("express-session")
var Socket  = require('./socket/Socket')

var connected = []

app.use(sessions({
    secret  : 'A83Hkzagg76tDRhgfYTNBè_@çkjharkjar',
    saveUninitialized:true,
    cookie : {maxAge : 3600*24},
    resave : false    
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(
    cors({
      origin: process.env.REACT_APP,
      credentials: true,
    })
);
// parse application/json
app.use(bodyParser.json())

//app.set('view engine','pug')
app.use(router)

const server = app.listen(8000);

const socket = new Socket(server)


