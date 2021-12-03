var {DataTypes}  = require('sequelize')
var sequelize = require('../database/Db')
const User = sequelize.define('User',{
    firstname : {
        type : DataTypes.STRING,
        allowNull  : false
    },
    lastname : {
        type : DataTypes.STRING,
        allowNull  : false
    },
    email : {
        unique  : true,
        primaryKey : true,
        type : DataTypes.STRING,
        allowNull  : false
    },
    password:  {
        type : DataTypes.STRING,
        allowNull : false
    },
    birthday : {
        type : DataTypes.DATE,
        allowNull : false
    }
})
sequelize.sync({force:true})

module.exports = User