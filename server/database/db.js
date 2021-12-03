var Sequelize = require('sequelize')

var sequelize = new Sequelize('livecomms','root','123',
    {
        host : 'localhost',
        dialect : 'mysql',
        loggin : false
    }
)

module.exports = sequelize