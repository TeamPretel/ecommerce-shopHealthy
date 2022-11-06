const express = require('express')
const rutaUsuario = express.Router()
/*
const listAllUsers = require('../../controlers/user/listAllUsers')
rutaUsuario.route('/lista')
  .get((req, res) => {
    // res.send('💩')
    res.send(listAllUsers())
  })
*/

rutaUsuario.use('/lista', require('./lista'))
rutaUsuario.use('/borrar', require('./borrar'))
rutaUsuario.use('/degradar', require('./degradar'))
rutaUsuario.use('/modificar', require('./modificar'))
rutaUsuario.use('/promover', require('./promover'))

module.exports = rutaUsuario
