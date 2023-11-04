const { DataTypes } = require('sequelize');

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  // Modelo para Dogs
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    anios: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
}
