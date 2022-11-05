const { Router } = require('express ')
const { Usuario } = require('../../db')
const router = Router()
const nodemailer = require('nodemailer')
const { check, validationResult } = require('express-validator')

//        /tresmiluno/usuario/consulta
router.post('/consulta',
  check('nombre').exists().not().isEmpty(),
  check('apellido').exists().not().isEmpty(),
  check('email').exists().isEmail().normalizeEmail(),
  check('telefono').exists().isNumeric().toInt(),
  check('mensaje').exists().not().isEmpty().isLength({ min: 10, max: 500}),

  const validateResult = (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(403)
      res.send({ errors: error.array() })
    }
  }
  

  (req, res, next) => {
    validateResult(req,res,next) 
  }, 
  
  async (req, res)=>{
    console.log(req.body)
    const {nombre, apellido, email, telefono, mensaje}=req.body

    const transport = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,   
      secure: false,
      auth: {
          user:'healthyshophenry@outlook.com',
          pass: 'proyectogripal7'
      },
      tls: {
          rejectUnauthorized: false   //permite mandar mails desde otro lado q no sea el localhost
      }
    })
  
    const info = await transport.sendMail({
      from: 'healthyshophenry@outlook.com',
      to: 'healthyshophenry@outlook.com',     
      subject: `Consulta de ${email}`,
       
      html: (`<p>       
      Email: ${email}<br>
      Mensaje: ${mensaje}</p>`)
    })

    console.log('Message sent', info.messageId)

    res.send('Mensaje Registrado!')
  }
)