const { Router } = require("express");
const { Venta } = require("../db")
const { Detalleventa } = require("../db");
const { Producto } = require('../db')
const { Categoria } = require('../db')
const { Marca } = require('../db')
const { Review } = require('../db')

const router = Router();

//GET TODAS LAS VENTAS
router.get("/", async (req, res) => {

  
  let vta = await Venta.findAll({
      attributes: ['id', 'fecha', 'precioTotal','estadoEnvio','usuarioId'],
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

})

  //GET VENTAS POR ID DE USUARIO
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
  
  })

//PUT VENTA, CAMBIA EL ESTADO, RECIBE ID VENTA
  router.put("/:id", async (req, res) => {
    try {
      
      let id = req.params.id;  //id venta

      const venta = await Venta.findByPk(id);
      const { estadoEnvio } = req.body;
      
  
      if (estadoEnvio) {
        venta.estadoEnvio = estadoEnvio;
        venta.save();
      }      
  
      res.status(200).send(`El estado de la venta ${id} fue cambiado a ${estadoEnvio}`);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
      
    }
  });
  

  module.exports = router