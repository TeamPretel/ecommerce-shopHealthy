const { Router } = require('express')
const categoriasRuta = require('./categoria')
const productosRuta = require('./producto')
const marcasRuta = require('./marca')
const usuarioruta = require('./usuarios')
const compraRuta = require('./rutapago')
const reviewRuta = require('./review')
const detalleventaRuta = require('./detalleventa')
const ventaRuta = require('./venta')
const path = require('path')
const { conn } = require('../db')
const cargadores = require('../controlers/cargadores')
// const Marca = require('../models/Marca')
const {
  categoriaCarga,
  marcasCarga,
  productosCarga
} = cargadores

const router = Router()

router.get('/tresmiluno/', async (req, res) => {
  // res.sendFile(path.join(path.join() + '/index.html'))
  res.sendFile(path.join(__dirname, 'index.html'))
})

router.get('/tresmiluno/droptodo', async (req, res) => {
  // await conn.query('SET FOREIGN_KEY_CHECKS = 0')
  await conn.drop()
  await conn.sync({ force: false })
  // await conn.query('SET FOREIGN_KEY_CHECKS = 1')
  res.status(418).json({ mensaje: 'Volaste todo a la miercoles!' })
  categoriaCarga()
  marcasCarga()
  productosCarga()
  console.log('Todos los esquemas dropeados y recargados!')
})

router.use('/tresmiluno/usuario', usuarioruta)
router.use('/tresmiluno/producto', productosRuta)
router.use('/tresmiluno/categoria', categoriasRuta)
router.use('/tresmiluno/marca', marcasRuta)
router.use('/tresmiluno/compra', compraRuta)
router.use('/tresmiluno/review', reviewRuta)
router.use('/tresmiluno/detalleventa', detalleventaRuta)
router.use('/tresmiluno/venta', ventaRuta)
router.use('/tresmiluno/dashboard', require('./dashboard'))

module.exports = router
