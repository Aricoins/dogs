const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Modelo para Dogs
  const Dog = sequelize.define('Dog', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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
