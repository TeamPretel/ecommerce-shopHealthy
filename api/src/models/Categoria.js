const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("categoria",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
<<<<<<< HEAD
=======

>>>>>>> main
      }
    },
    {
      name: {
        singular: "categoria",
        plural: "categoria"
      },
      timestamps: false,
    }
  );
};
