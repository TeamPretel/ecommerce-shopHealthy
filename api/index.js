require('dotenv').config()
console.log(process.env.DB_HOST)
const { conn } = require('./src/db')
const server = require('./src/app.js')
// const { Sequelize } = require('sequelize')

// conn.drop() // Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('El back está listeneando en 3001')
  })
})
