const { Router } = require('express ')
const { Usuario } = require('../../db')
const router = Router()
const nodemailer = require('nodemailer')
const { check, validationResult } = require('express-validator')


router.post('/crear', 
  check('nombre').exists().not().isEmpty(),
  check('apellido').exists().not().isEmpty(),
  check('direccion').exists().not().isEmpty(),
  check('num_dir').exists().isNumeric(),
  check('codPostal').exists().isNumeric().custom((value,{req})=>{
    if(value < 1001 || value > 9431){
      throw new Error('UPSSS valor no valido')
    }
    return true
  }),
  check('telefono').exists().isNumeric(),
  check('mail').exists().isEmail().normalizeEmail(),
  check('isAdmin').exists().isBoolean(),
  check('edad').exists().isNumeric().custom((value,{req})=>{
    if(value < 18 ){
      throw new Error('Debe ser mayor de edad, 😥')
    }
    return true
  }),
  check('genero').exists().not().isEmpty().isLength({min:5,max:6}),
  (req,res,next)=>{
    validateResult(req,res,next)
  },

  async (req, res) => {
    try {
      const {
        id,
        nombre,
        apellido,
        direccion,
        num_dir,
        codPostal,
        telefono,
        mail,
        isAdmin,
        edad,
        genero
      } = req.body
      
      const usuario = await Usuario.create({
        id: id,
        nombre: nombre,
        apellido: apellido,
        edad:edad,
        genero:genero,
        direccion: direccion,
        num_dir: num_dir,
        codPostal: codPostal,
        telefono: telefono,
        mail: mail,
        isAdmin: isAdmin,
        activo:true
      })
      
      const transport = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,   //con ssl o 25 sin ssl
        secure: false,
        auth: {
            user:'healthyshophenry@outlook.com' ,
            pass: 'proyectogripal7'
        },
        tls: {
            rejectUnauthorized: false   //permite mandar mails desde otro lado q no sea el localhost
        }
    })
        const info = await transport.sendMail({
        from: ''Healthy Shop 🥗🍚' <healthyshophenry@outlook.com>', 
        to: `${mail}`, 
        subject: 'Confirmación de registro.', 
        
        html: `<b><h1>Bienvenido ${nombre} y gracias por ser parte de una vida más saludable</h1>
      </b>`, 
      })
      console.log('Message sent: %s', info.messageId)
      res.status(200).send(usuario)
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }

  }
)
