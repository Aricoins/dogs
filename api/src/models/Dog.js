const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  // Modelo para Dogs
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 20],
          msg: "El nombre debe tener entre 2 y 20 caracteres",
        },
      },
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
    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Dog;
};