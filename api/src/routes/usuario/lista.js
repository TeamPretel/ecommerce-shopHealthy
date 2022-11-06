const express = require('express')
const lista = express.Router()
const listAllUsers = require('../../controlers/user/listAllUsers')

lista.get('/', (req, res) => {
  res.send(listAllUsers())
})

module.exports = lista
