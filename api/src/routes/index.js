const { Router } = require('express')

const path = require('path')
const { conn } = require('../db')
const cargadores = require('../controlers/cargadores')

const rutaCategoria = require('./categoria')
const rutaProducto = require('./producto')
const rutaMarca = require('./marca')
const rutaUsuario = require('./usuario')
// const Marca = require('../models/Marca')
// const compraRuta = require('./rutapago')
// const reviewRuta = require('./review')

const router = Router()

router.get('/tresmiluno', async (req, res) => {
  res.sendFile(path.join(path.resolve() + '/index.html'))
})

const {
  categoriaCarga,
  marcasCarga,
  productosCarga
} = cargadores
router.get('/tresmiluno/droptodo', async (req, res) => {
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
router.use('/tresmiluno/usuario', rutaUsuario)
router.use('/tresmiluno/producto', rutaProducto)
router.use('/tresmiluno/categoria', rutaCategoria)
router.use('/tresmiluno/marca', rutaMarca)

module.exports = router
