require('dotenv').config()
console.log(process.env.DB_HOST)

// const { Sequelize } = require('sequelize')
const server = require('./src/app.js')
const { conn } = require('./src/db')

// conn.drop() // Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('El back está listeneando en 3001')
  })
})
