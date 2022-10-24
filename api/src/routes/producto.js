const { Router } = require("express");
const { Op } = require('sequelize')
//Instalo e importo axios//
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Producto, Marca, Categoria } = require("../db");
// const {API_KEY} = process.env;

const router = Router();


router.get("/marca", async (req, res) => {
  try {
    const { nombre } = req.query;
    const productos = await Producto.findAll({
      attributes: ["id", "nombre", "precio", "img", "stock", "descripcion"],
      include: [{
          model: Marca,
          attributes:[],
        where:{
          nombre: nombre
        }
        }
    ],
    }).then((prod)=>res.json(prod))
    
  } 
  catch (error) {
    console.log(error)
  }
  });


router.get("/", async (req, res) => {
  /*
  const {nombre,marca } = req.query
  let todosLosProductos = await Producto.findAll()
  if (nombre) {
    let productoFiltrado = todosLosProductos.filter( prod => prod.nombre.toLowerCase().includes(nombre.toLowerCase()))
    productoFiltrado.length ? 
    res.status(200).send(productoFiltrado) : res.status(404).send('Not found or does not exist 😥') // trae un perro q buscas especificamente.
  }else{
    // res.status(201).send(todosLosProductos) //trae todos los perros
    Producto.findAll({
      include: { 
        model: Categoria,
        attributes: ['nombre']
      }, 
    }).then(prods => res.json(prods))
  }
*/
  res.json(getProductos())
})

/* 
// TRAER PRODUCTOS POR MARCA... DEBE FUNCIONAR BIEN.... VIDEO AZR MEDIA VIDEO#5
router.get("/marca/:nombre", async (req, res) => {
  try {
    console.log(`Tengo el param: ${JSON.stringify(req.params)}`)
    const { nombre } = req.params; 
    const unaMarca = await Marca.findOne({
      where: { nombre: nombre}
    })
    let prodPorMarca = await Producto.findAll({
      where:{
        marcaId: unaMarca.id
      }
    })
    // include: [{ 
        console.log(`Encontré la marca ${JSON.stringify(unaMarca.id)} y el prod tiene ${prodPorMarca.marcaId}`)
      //   model: Categoria,
      //   attributes: []
      // },{
      //   model: Marca,
      //   attributes:[]
      // }],     
    // .then(() => {
    //   if (prodPorMarca) {
    //     res.status(201).send(prodPorMarca)
    //   } 
    //   res.status(404).send('No se encontró ningún producto de la marca ' + nombre)
    // })
  } catch (error) {
    console.log(error)
  }
  
  res.status(201).send(prodPorMarca)

});
*/

// TRAER PRODUCTOS POR CATEGORIA.
router.get("/categoria", async (res, req) => {
  try {
    const { nombre } = req.query;
    const productos = await Producto.findAll()
    //   attributes: ["id", "nombre", "precio", "img", "stock", "descripcion"],
    //   include: [{
    //     model: Marca,
    //     attributes: []
    //   },{
    //       model: Categoria,
    //       attributes:[],
    //     where:{
    //       nombre: nombre
    //     }
    //     }
    // ],     
    res.status(201).send(productos);
  }
  catch (error) {
    res.status(404).send(error)
  }
});



//Crear categoria
router.post("/categoria/crear", async (req, res) => {
  try {
    const { nombre } = req.body;
    const categoria = await Categoria.create({
      nombre: nombre,
    });
    res.status(200).send(categoria);
  } catch (error) {
    res.status(404).send(error);
  }
});

//* PUT  Corrección de categorías
router.put("/categoria/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Categoria.findByPk(id);
    const { nombre } = req.body;
    if (nombre) {
      producto.nombre = nombre;
      producto.save();
    }
    res.status(200).send({ msg: "cambios guardados!" });
  } catch (error) {
    res.status(400).send(error);
  }
});
//? POST crear PRODUCTO



router.post("/admin/crear", async (req, res) => {
  const categoriasAux = await Categoria.findAll({
    include: [{ model: Producto }],
  });

  try {
    const { nombre, descripcion, precio, stock, imagen, categorias } = req.body;
    const producto = await Producto.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
    });

    let auxiliar = [];

    categoriasAux?.forEach((elemento) => {
      const filtroId = categorias.filter((c) => c.nombre === elemento);
      auxiliar.push(filtroId[0].id);
    });

    auxiliar?.map((id) => {
      Categoria.findByPk(id).then((esaCategoria) => {
        Producto.findByPk(producto.id) //aca va el id del producto creado
          .then((productoNuevo) => {
            esaCategoria.addProducto(productoNuevo);
          })
          .catch((error) => {
            return res.status(400).json(error);
          });
      });
    });
    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* PUT Producto

router.put("/admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Producto.findByPk(id);
    const { nombre, precio, descripcion, imagen, stock } = req.body;

    if (nombre) {
      producto.nombre = nombre;
      producto.save();
    }
    if (precio) {
      producto.precio = precio;
      producto.save();
    }
    if (descripcion) {
      producto.descripcion = descripcion;
      producto.save();
    }
    if (imagen) {
      producto.imagen = imagen;
      producto.save();
    }
    if (stock) {
      producto.stock = stock;
      producto.save();
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error);
  }
});



//GET DETAILS :ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let productodetalle = await Producto.findByPk(id.toUpperCase(), {
      include: [Categoria,Marca],
    });
    if (productodetalle) {
      productodetalle.img = "dkndrd.com/pf-healthyShop/".concat(productodetalle.img) 
      res.send(productodetalle) 
    }
  } catch (error) {
    res.status(404).json("No existe el producto seleccionado");
  }
});

module.exports = router


// (productos.length > 0) {
  //       res.status(201).send(productos);
  //     } else {
  //       res.status(404).json("No existen datos del producto ingresado");
  //     }
  //   } else {
  //     //traigo datos de BD  //const allCountries = await Country.findAll({ attributes: ['id', 'name','continent','image','population']});
  //     const productos = await Producto.findAll({
  //       attributes: ["id", "nombre", "precio", "img", "stock", "descripcion"],
  //       include: [Marca, Categoria],
  //       order: [["nombre", "ASC"]],
  //     });

  //     if (productos.length > 0) {
  //       res.status(201).send(productos);
  //     } else {
  //       res.status(404).json("No existen productos");
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(404)
  //     .json("No se pueden mostrar los productos, gracias vuelva pronto");
  // }
  //traigo datos de BD filtrado por nombre. AGREGAR LA CONDICION DE ACTIVO.
  // attributes: ["id", "nombre", "precio", "img", "stock", "descripcion"],
  // const productos = await Producto.findAll()
  // res.status(200).json(productos)
  // try {
    // const { nombre } = req.query;
    // if (nombre) { 
    //   const productos = await Producto.findAll({
    //     where: {
    //       nombre: { [Op.iLike]: "%" + nombre + "%" },
    //     },
    //     include: {
    //       model: Marca,
    //       attributes: ['nombre']
    //     },
    //   });
    // }