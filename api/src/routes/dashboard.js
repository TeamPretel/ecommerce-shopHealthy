const { Router } = require('express')
const rutaDashboard = Router()
const { listAllUsers, setUserRole } = require('./../controlers/dashboard')

rutaDashboard.get('/promover', (req, res) => {
  const { email } = req.query
  res.json(setUserRole(email, 'admin'))
})

rutaDashboard.get('/degradar', (req, res) => {
  const { email } = req.query
  res.json(setUserRole(email, 'regular'))
})

// rutaDashboard.get('/modificar', (req, res) => {
//   // recibimos user modificado por body
//   const {/* datos del user */} = req.body
//   // TODO
//   res.json('💩')
// })

// rutaDashboard.get('/eliminar', (req, res) => {
//   // email del user a eliminar
//   const { email } = req.query
//   // TODO
//   res.json('💩')
// })

rutaDashboard.get('/', async (req, res) => {
  const usuarios = await listAllUsers()
  console.log('Se envió la lista de usuarios a dashboard')
  res.json(usuarios)
})

module.exports = rutaDashboard
