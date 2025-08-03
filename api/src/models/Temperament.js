const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temperament = sequelize.define('Temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Cambiado a false para mayor seguridad
      unique: true // Asegura nombres únicos
    },
  });

  // ¡IMPORTANTE! Exportar el modelo
  return Temperament;
};
