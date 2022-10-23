require('dotenv').config();
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')


// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }) 
const sequelize = new Sequelize('u381026178_eCommerceSalud', 'u381026178_admin', 'Qu&df=#;E2', {
  host: 'sql811.main-hosting.eu',
  dialect: 'mysql',


  logging: false, 
  native: false,

}) 
sequelize.authenticate().then(() => {
  console.log('Nos conectamos a la base de hostinger!!!')
})
.catch(err => console.error(err))

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models')) 
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Categoria, Marca, Producto } = sequelize.models;
Producto.belongsToMany(Categoria, {through: 'productosPorCategoria', timestamps: false})
Categoria.belongsToMany(Producto, {through: 'productosPorCategoria', timestamps: false})
Producto.belongsTo(Marca)
Marca.hasMany(Producto, {
  foreignKey: 'marcaId'
});

module.exports = {
  ...sequelize.models,
  conn:sequelize
}
