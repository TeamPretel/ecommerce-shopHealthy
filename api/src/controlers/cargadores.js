const { conn } = require('../db.js');
const { Categoria, Marca, Producto } = conn.models
const categoria = require('../data/categorias')
const marcas = require('../data/marcas')
const productos = require('../data/productos')

// const newActivity = await Activity.create({name, difficulty, duration, season })
// let countries = await Country.findAll({
//     where: { name: paises}
// })
// newActivity.addCountry(countries)
  
async function categoriaCarga() {
    try {
      categoria.forEach(category => {
        Categoria.create(category)
      })
    }
    catch (error) {
      console.log('No se cargaron los datos a la BD')
    }
}
  
async function marcasCarga() { 
try { 
    marcas.forEach(async c => {
    const {marcaId, nombre} = c;
    const m = await Marca.create({marcaId, nombre})
    })
} catch (error) {
    console.log('No se cargaron los datos a la BD')
}
}
  
async function productosCarga() {
productos.forEach(async c => {
    const { nombre, precio, descripcion, img, stock, marcaId, idCategoria } = c
    //console.log(idCategoria)
    const nuevoProducto = await Producto.create({ nombre, precio, descripcion, img, stock, marcaId })
    await Promise.all(
      c.idCategoria.split(',').map(async (uwu) => {
        const unaCategoria = await Categoria.findByPk(uwu)
        nuevoProducto.addCategoria(unaCategoria)
      })
    )
    // const estaMarca =  await Marca.findByPk(parseInt(idMarca))
})
}

module.exports = {
    categoriaCarga,
    marcasCarga,
    productosCarga
}