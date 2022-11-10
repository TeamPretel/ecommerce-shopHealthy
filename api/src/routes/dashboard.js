const { Router } = require('express')
// const auth = require('../controlers/dashboard/initFAdmin')
const rutaDashboard = Router()
const {
  listAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  setUserRole
} = require('./../controlers/dashboard')

rutaDashboard.get('/crear', async (req, res) => {
  console.log('Creando un usuario...')
  try {
    const { user } = req.body
    res.json(createUser(user))
  } catch (error) {
    res.status(500).json(error)
  }
})
rutaDashboard.get('/promover', async (req, res) => {
  console.log('Hacer admin...')
  const { email } = req.query
  res.json(setUserRole(email, 'admin'))
})
rutaDashboard.get('/deshacer', async (req, res) => {
  console.log('DESHacer admin...')
  const { email } = req.query
  res.json(setUserRole(email, 'regular'))
})
rutaDashboard.get('/modificar', async (req, res) => {
  const { email } = req.query
  const { update } = req.body
  // recibimos user modificado por body
  res.json(updateUser(email, update))
})
rutaDashboard.get('/eliminar', async (req, res) => {
  // email del user a eliminar
  const { email } = req.query
  // TODO
  res.json(deleteUser(email))
})
rutaDashboard.get('/resetpass', async (req, res) => {
  const { email, n } = req.query
  res.json(updateUser({ email, password: n }))
})
rutaDashboard.get('/', async (req, res) => {
  console.log('Importando la tabla de usuarios desde firebase...')
  try {
    if (!req.query.email) {
      console.log('retonrnando algo!!!')
      return res.json(await listAllUsers())
    }
    console.log('Buscar a: ' + req.query.email)
    console.log('Buscamos ...  ' + await getUser(req.query.email))
    res.json(await getUser(req.query.email))
  } catch (error) {
    res.status(404).json({ error: 'No tenemos un usuario con ese email' })
  }
})
module.exports = rutaDashboard
