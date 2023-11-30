const { DataTypes } = require('sequelize');
  // Modelo para Temperaments
  
module.exports = (sequelize) => {
  const Temperament = sequelize.define('Temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
          unique: true,
    },
  });

}
