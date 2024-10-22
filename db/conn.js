const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('hmhdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log("Successfully connected to database.")
} catch(err) {
    console.log("Not possible to connect to database:", err)
}

module.exports = sequelize