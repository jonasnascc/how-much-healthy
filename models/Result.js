const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Result = db.define('Result', {
    bmi: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        require: true
    },
    absi: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        require: true
    },
    bfp: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        require: true
    }
})

Result.belongsTo(User)
User.hasMany(Result)

module.exports = Result