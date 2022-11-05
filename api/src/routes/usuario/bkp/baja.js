router.post("/baja/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const usuarioBaja = await Usuario.findByPk(id)
    if (usuarioBaja) {
      usuarioBaja.activo=false
      usuarioBaja.save()
      
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
    res.status(200).send(id)
  } catch (error) {
    next(error)
  }
})
