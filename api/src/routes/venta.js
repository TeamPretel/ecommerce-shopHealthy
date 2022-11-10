const { Router } = require("express");
const { Venta } = require("../db")
const { Detalleventa } = require("../db");
const { Producto } = require('../db')
const { Categoria } = require('../db')
const { Marca } = require('../db')
const { Review } = require('../db')

const router = Router();



  router.get("/:id", async (req, res) => {

    const {id} = req.params
    let vta = await Venta.findAll({
        attributes: ['id', 'fecha', 'precioTotal','estadoEnvio','usuarioId'],
        where: {
            usuarioId: id
        },
        include: { 
            model: Detalleventa,
            attributes: ['id', 'cantidad', 'precioUnitario'],
            include:{ 
                model: Producto,
                attributes: ['id', 'nombre', 'precio','img','stock','descripcion','marcaId'],
                include: [{ 
                    model: Categoria,
                    attributes: ['nombre']
                  },{
                    model: Marca,
                    attributes: ['nombre']
                  },{
                    model: Review,
                    attributes: ['puntaje', 'titulo', 'comentario']
                    
                  }],                
              }          
            
            
        }        
    })

    res.send(vta)
    
 /*    var detalle;
    var detalles = []
    vta.forEach(async item => {
        detalle = await Detalleventa.findAll({
            where: {
                ventumId: item.id
            }, 
            include: { 
                model: Producto,
                attributes: ['id','nombre', 'img', 'descripcion', 'stock', 'activo', 'marcaId'],
                include: [{ 
                    model: Categoria,
                    attributes: ['nombre']
                  },{
                    model: Marca,
                    attributes: ['nombre']
                  }], 
                
              }
        }) 
        console.log(detalle)
        detalles.push(detalle)
      }) 
 */
    /*   vta.length ? 
    res.status(200).send(vta) : res.status(404).send('No hay detalles de venta para el usuario ingresado 😥')  */
    
    /* detalle ? 
    res.status(200).send(detalle) : res.status(404).send('No hay detalles de venta para el usuario ingresado 😥')  */
    
  
  })

  module.exports = router