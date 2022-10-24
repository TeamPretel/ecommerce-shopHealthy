const { Router } = require('express');
const categoriasRuta= require('./categoria')
const productosRuta= require('./producto')
const marcasRuta= require('./marca')
const usuarioruta = require('./usuarios')
const emailruta = require('./usuarios')
const path = require('path');
const { conn } = require('../db');
const cargadores = require('../controlers/cargadores');
const Marca = require('../models/Marca');
const {
  categoriaCarga,
  marcasCarga,
  productosCarga
} = cargadores


const router = Router();
router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

router.get("/droptodo", async (req, res) => {
    //await conn.query('SET FOREIGN_KEY_CHECKS = 0')
    await conn.drop()
    await conn.sync({force: true})
    //await conn.query('SET FOREIGN_KEY_CHECKS = 1')
    res.status(418).json({mensaje: 'Volaste todo a la miercoles!'})
    categoriaCarga()
    marcasCarga()
    productosCarga()
    console.log('Todos los esquemas dropeados y recargados!')
})




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/productos', productosRuta)
router.use('/categorias', categoriasRuta)
router.use('/marcas',marcasRuta)
router.use('/usuario',usuarioruta)
router.use('/email',emailruta)
module.exports = router;