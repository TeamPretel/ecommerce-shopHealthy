const express = require('express')
const rutaUsuario = express.Router()
// const listAllUsers = require('../../controlers/user/listAllUsers')

const borrar = require('./borrar')
const degradar = require('./degradar')
const lista = require('./lista')
const modificar = require('./modificar')
const promover = require('./promover')
// console.log('💩💩💩💩💩💩💩💩💩💩💩💩💩💩')

rutaUsuario.use('/lista,', lista)
rutaUsuario.use('/borrar,', borrar)
rutaUsuario.use('/degradar,', degradar)
rutaUsuario.use('/modificar,', modificar)
rutaUsuario.use('/promover,', promover)

/*
rutaUsuario.route('/lista')
  .get((req, res) => {
    // res.send('💩')
    res.send(listAllUsers())
  })
*/

module.exports = rutaUsuario
