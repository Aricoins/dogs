const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Modelo para Dogs
  const Dog = sequelize.define('Dog', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    AniosDeVida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}
