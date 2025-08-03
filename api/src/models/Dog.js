const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, // Cambiado a false
      validate: {
        len: {
          args: [2, 20],
          msg: "El nombre debe tener entre 2 y 20 caracteres",
        },
      },
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false, // Cambiado a false
      validate: {
        isUrl: true // Validación adicional
      }
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false, // Cambiado a false
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false, // Cambiado a false
    },
    anios: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cambiado a false
      validate: {
        min: 1 // Validación adicional
      }
    }
  });

  return Dog;
};
