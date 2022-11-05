const { Router } = require('express ')
const { Usuario } = require('../../db')
const router = Router()
const nodemailer = require('nodemailer')
const { check, validationResult } = require('express-validator')

/*
router.get('/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.findAll()
    res.status(200).send(usuario)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})*/

module.exports = router