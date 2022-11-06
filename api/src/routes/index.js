const { Router } = require('express')

const path = require('path')
const { conn } = require('../db')
const cargadores = require('../controlers/cargadores')

const routes = Router()
routes.use('/producto', require('./producto'))
routes.use('/marca', require('./marca'))
routes.use('/categoria', require('./categoria'))
routes.use('/usuario', require('./usuario'))
// const Marca = require('../models/Marca')
// const compraRuta = require('./rutapago')
// const reviewRuta = require('./review')

routes.get('/', async (req, res) => {
  res.sendFile(path.join(path.resolve() + '/index.html'))
})

const {
  categoriaCarga,
  marcasCarga,
  productosCarga
} = cargadores
routes.get('/droptodo', async (req, res) => {
  await conn.query('SET FOREIGN_KEY_CHECKS = 0')
  await conn.drop()
  await conn.sync({ force: false })
  await conn.query('SET FOREIGN_KEY_CHECKS = 1')
  res.status(418).json({ mensaje: 'Volaste todo a la miercoles! 💩' })
  categoriaCarga()
  marcasCarga()
  productosCarga()
  console.log('Todos los esquemas dropeados y recargados!')
})

// Configurar los routers

module.exports = routes
