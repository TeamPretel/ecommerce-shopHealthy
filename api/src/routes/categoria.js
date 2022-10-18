const { Router } = require("express");
//Instalo e importo axios//
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Categoria, Producto, Marca } = require("../db");
// const {API_KEY} = process.env;

const router = Router();

router.get("/:categoria", async (req, res) => {
  const { categoria } = req.params
  console.log(categoria)
  const InstanciaCategoria = await Categoria.findOne({
    where: {
      nombre: categoria
    }
  })  
  console.log(JSON.stringify(InstanciaCategoria))

  Categoria.findAll({
    include: { 
      model: Producto,
      attributes: ['nombre']
    }
  }).then((prods) => {res.json(prods)})
  
})

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: ["nombre", "id"],
    });

    if (categorias.length > 0) {
    res.status(200).send(categorias);
    } else {
      res.status(404).json("No existe ninguna categoria ");
    }
  } catch (error) {
    res.status(404).json(" Error 404,No se pueden mostrar las categorias");
  }
});
module.exports = router