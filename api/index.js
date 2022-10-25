const { Sequelize } = require('sequelize');
const server = require('./src/app.js');
<<<<<<< HEAD
=======



>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
const { conn } = require('./src/db');

// Syncing all the models at once.
// conn.drop() 

conn.sync({ force: false }).then(() => {

  server.listen(3001, () => {
    console.log('El back está listeneando en 3001'); 
  });
});



