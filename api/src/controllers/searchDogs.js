require("dotenv").config()
const axios = require('axios');
const { Dog } = require('../db');
const { Op, Sequelize} = require('sequelize');
const distanciaLexica = require('./distanciaLexica');

async function searchDogs(nombre) {
  try {
    // Consultar la API externa
    //?api_key=${process.env.API_KEY}
    const response = await axios(`https://api.thedogapi.com/v1/breeds`);
    const apiData = response.data;

    const APIdogs = apiData.filter((dog) => {
      return distanciaLexica(dog.name.toLowerCase(), nombre.toLowerCase()) <= 1;
    });

    // Consultar en la base de datos local
    const dbDogs = await Dog.findAll({
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${nombre}%`, // Búsqueda insensible a mayúsculas y minúsculas
            },
          },
          {
            nombre: {
              [Op.substring]: Sequelize.literal(`FREETEXT('${nombre}')`), // Búsqueda tolerante a errores tipográficos
            },
          },
        ],
      },
    });

    // responde con los datos de ambas fuentes

    return [...APIdogs, ...dbDogs];
  } catch (error) {
    // Manejar errores, por ejemplo, podrías lanzar una excepción o devolver un objeto de error
    console.error('Error en la búsqueda de perros:', error);
    throw new Error('Error en la búsqueda de perros');
  }
}

module.exports = searchDogs;
