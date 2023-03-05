require('dotenv').config()
// const { Sequelize } = require('sequelize')
const server = require('./src/app.js')
const PORT = process.env.PORT

const { conn } = require('./src/db')

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Backend HealthyShop escuchando en ${PORT}`)
  })
})
