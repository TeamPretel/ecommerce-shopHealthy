const { Router } = require("express");
const{Usuario}= require('../../db');
const router = Router();
const nodemailer= require('nodemailer');
const {check, validationResult}= require('express-validator');

const validateResult =(req,res,next)=>{
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    res.send({errors:error.array()})
  }
}


router.get("/usuarios", async (req, res) => {
    try {
      const usuario = await Usuario.findAll();
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
  //        /tresmiluno/usuario/consulta
  router.post('/consulta',
                            check('nombre').exists().not().isEmpty(),
                            check('apellido').exists().not().isEmpty(), 
                            check('email').exists().isEmail().normalizeEmail(),
                            check('telefono').exists().isNumeric().toInt(),
                            check('mensaje').exists().not().isEmpty().isLength({min:10,max:500}),
                            (req,res,next)=>{
                            validateResult(req,res,next) 
                          }, 
  async (req,res)=>{
    console.log(req.body)
const {nombre, apellido, email, telefono, mensaje}=req.body;

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
})

router.post("/crear",check('nombre').exists().not().isEmpty(),
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
                      }

, async (req, res) => {
    try {
      const {
        id,nombre,apellido,direccion,num_dir,codPostal,telefono,mail,isAdmin,edad,genero} = req.body;
      

      
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
      });
      
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
        from: '"Healthy Shop 🥗🍚" <healthyshophenry@outlook.com>', 
        to: `${mail}`, 
        subject: "Confirmación de registro.", 
        
        html: `<b><h1>Bienvenido ${nombre} y gracias por ser parte de una vida más saludable</h1>
      </b>`, 
      })
      console.log("Message sent: %s", info.messageId)
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  
  });
  

router.put("/modificar/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findByPk(id);
      const {
        uid,
        nombre,
        apellido,
        direccion,
        codPostal,
        telefono,
        mail,
        isAdmin,
      } = req.body;
      console.log(req.body)
      let cambios=[]
      if (uid) {
        usuario.id = uid;
        usuario.save();
        
      }
      if (nombre) {
        usuario.nombre = nombre;
        usuario.save();
        cambios.push("nombre")
      }
      if (apellido) {
        usuario.apellido = apellido;
        usuario.save();
        cambios.push("apellido")
      }
      if (direccion) {
        usuario.direccion = direccion;
        usuario.save();
        cambios.push("dirección")
      }
      if (codPostal) {
        usuario.codPostal = codPostal;
        usuario.save();
        cambios.push("codPostal")
      }
      if (telefono) {
        usuario.telefono = telefono;
        usuario.save();
        cambios.push("telefono")
      }
      if (mail) {
        usuario.mail = mail;
        usuario.save();
        cambios.push("mail")
      }
      if (isAdmin) {
        usuario.isAdmin = isAdmin;
        usuario.save();
      }
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
      from: '"Healthy Shop 🥗🍚" <healthyshophenry@outlook.com>', 
      to: `${usuario.mail}`, 
      subject: "Confirmación de modificación de datos.", 
      
      html: `<b>Los datos de ${usuario.mail}, ${cambios.join(', ')} han sido modificados.</b>`, // html body
    })
    
    console.log("Message sent: %s", info.messageId)

      res.status(200).send(id);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
router.post("/baja/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const usuarioBaja = await Usuario.findByPk(id);
      if (usuarioBaja) {
        usuarioBaja.activo=false
        usuarioBaja.save();
        
      }
      const transport = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,   //con ssl o 25 sin ssl
        secure: false,
        auth: {
            user:'healthyshophenry@outlook.com' ,
            pass: 'proyectogripal7'
        },
        tls: {
            rejectUnauthorized: false   
        }
    })
    const info = await transport.sendMail({
      from: '"Healthy Shop 🥗🍚" <healthyshophenry@outlook.com>', 
      to: `${usuarioBaja.mail}`, 
      subject: "Confirmación de Baja 😪😪.", 
      
      html: `<b>El usuario ${usuarioBaja.mail} ha sido dado de baja.</b>`
    })
    
    console.log("Message sent: %s", info.messageId)
      res.status(200).send(id);
    } catch (error) {
      next(error);
    }
  });
  module.exports = router;