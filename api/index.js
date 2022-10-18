const { Sequelize } = require('sequelize');
const server = require('./src/app.js');
const cargadores = require('./src/controlers/cargadores')
const { conn } = require('./src/db');

const {
  categoriaCarga,
  marcasCarga,
  productosCarga
} = cargadores
// Syncing all the models at once.
// conn.drop() 
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('El back está listeneando en 3001'); 
    categoriaCarga()
    marcasCarga()
    productosCarga()
  });
});



