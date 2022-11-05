const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')

/*
  const {
    DB_USER, DB_PASSWORD, DB_HOST
  } = process.env
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf-demo`, {
          logging: false,
          native: false,
        })
*/
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  native: false
})

sequelize.authenticate().then(() => {
  console.log('Nos conectamos a la base de hostinger!!!')
}).catch(err => console.error(err))

const basename = path.basename(__filename)
const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize))
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

const { Categoria, Marca, Producto, Usuario, Review, Detalleventa, Venta } = sequelize.models
Producto.belongsToMany(Categoria, { through: 'productosPorCategoria', timestamps: false })
Categoria.belongsToMany(Producto, { through: 'productosPorCategoria', timestamps: false })
Producto.belongsTo(Marca)
Marca.hasMany(Producto, {
  foreignKey: 'marcaId'
})


Detalleventa.belongsTo(Venta)
Venta.hasMany(Detalleventa)

Producto.hasMany(Detalleventa)
Detalleventa.belongsTo(Producto)

Usuario.hasMany(Venta, {
  foreignKey: 'usuarioId'
})
Venta.belongsTo(Usuario)

/* Detalleventa.belongsTo(Usuario)
Usuario.hasMany(Detalleventa)
Producto.belongsToMany(Detalleventa, {through:Venta})
Detalleventa.belongsToMany(Producto, {through:Venta}) */

// Usuario.belongsToMany(Producto,{through:"Producto_Usuario"})
// Producto.belongsToMany(Usuario,{through:"Producto_Usuario"})

module.exports = {
  ...sequelize.models,
  conn: sequelize
}
