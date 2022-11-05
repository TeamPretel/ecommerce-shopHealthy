router.put('/modificar/:id', async (req, res) => {
  try {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    const {
      uid,
      nombre,
      apellido,
      direccion,
      codPostal,
      telefono,
      mail,
      isAdmin,
    } = req.body
    console.log(req.body)
    let cambios=[]
    if (uid) {
      usuario.id = uid
      usuario.save()
      
    }
    if (nombre) {
      usuario.nombre = nombre
      usuario.save()
      cambios.push('nombre')
    }
    if (apellido) {
      usuario.apellido = apellido
      usuario.save()
      cambios.push('apellido')
    }
    if (direccion) {
      usuario.direccion = direccion
      usuario.save()
      cambios.push('dirección')
    }
    if (codPostal) {
      usuario.codPostal = codPostal
      usuario.save()
      cambios.push('codPostal')
    }
    if (telefono) {
      usuario.telefono = telefono
      usuario.save()
      cambios.push('telefono')
    }
    if (mail) {
      usuario.mail = mail
      usuario.save()
      cambios.push('mail')
    }
    if (isAdmin) {
      usuario.isAdmin = isAdmin
      usuario.save()
    }
    const transport = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,   //con ssl o 25 sin ssl
      secure: false,
      auth: {
        user:'healthyshophenry@outlook.com' ,
        pass: process.env.MAIL_PWD
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

      res.status(200).send(id)
  } catch (error) {
    res.status(400).send(error)
  }
})
  