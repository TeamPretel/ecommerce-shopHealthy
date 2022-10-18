const { Router } = require("express");
const { Marca } = require("../db");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const { nombre } = req.query
    if (nombre ) {
      console.log(`Tengo el query: ${nombre}`)
      const unaMarca = await Marca.findOne({
        where: { nombre: nombre}
      })
      let prodPorMarca = await Producto.findAll({
        where:{
          marcaId: unaMarca.id
        }
      })
      console.log(`Encontré la marca ${JSON.stringify(unaMarca.id)} y el prod tiene ${prodPorMarca.marcaId}`)
    } else {
      const marcas = await Marca.findAll({ attributes: ["id","nombre" ] });
      if (marcas.length > 0) {
        res.status(200).send(marcas);
      } else {
        res.status(404).json("No existe la marca");
      }
    }
  } catch (error) {
    res.status(404).json(error  );
  }
});
module.exports = router


