const { Sequelize } = require('sequelize');
const server = require('./src/app.js');
const { conn } = require('./src/db');

// Syncing all the models at once.
// conn.drop() 
<<<<<<< HEAD
conn.sync({ force: false}).then(() => {
=======

conn.sync({ force: false }).then(() => {

>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
  server.listen(3001, () => {
    console.log('El back está listeneando en 3001'); 
  });
});



