const { DataTypes } = require('sequelize');
  // Modelo para Temperaments
  
module.exports = (sequelize) => {
  const Temperament = sequelize.define('Temperament', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

}
