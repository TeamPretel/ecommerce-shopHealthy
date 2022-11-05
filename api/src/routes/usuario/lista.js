const express = require('express')
const lista = express.Router()
const listAllUsers = require('../../controlers/user/listAllUsers')

// console.log('🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇')

lista.get('/', (req, res) => {
  // console.log('puras mermas 🧵🧵🧵🧵🧵🧵🧵🧵')
  res.send(listAllUsers())
})

module.exports = lista
